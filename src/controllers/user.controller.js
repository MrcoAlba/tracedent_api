const usersSchema = require("../models/user")
const { Op } = require('sequelize')

// READ     -> GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        var offset = req.query.offset
        var limit = req.query.limit

        console.log("TESTING")
        console.log(typeof offset)
        console.log(containsOnlyNumbers(offset))
        console.log("TESTING")
        console.log(typeof limit)
        console.log(containsOnlyNumbers(limit))
        console.log("TESTING")
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        
        const user = await usersSchema.findAndCountAll({
            attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
            order:      [['id_user','ASC']],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })

        const data = user.rows
        const total = user.count
        const count = data.length

        res.status(200).send({
            message:"OK",
            data:data,
            meta:{total: total, count:count, offset: offset, limit: limit}
        })
    } catch (error) {
        res.status(400).send({
            message:"There was an error",
            response:error
        })
    }
}
// UPDATE   -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
const patchUserSubById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await usersSchema.update({
                subscription: true,
            }, {
            where: {
                [Op.and]: [{
                    id_user: {
                        [Op.eq]: id
                    }
                }, {
                    user_type: {
                        [Op.not]: "patient"
                    }
                }
                ]
            }
        }
        )
        res.status(200).send({cod:1,response:user})
    } catch (error) {
        // Due to a simple change in a value, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({cod:0,response:error})
    }
}
// LOGIN   -> RETURN 1 IF LOGIN TRUE
const loginMailPass = async (req, res) => {
    try {
        // GET BODY
        const {
            mail, password
        } = req.body
        const user = await usersSchema.findOne({
            attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
            where: {
                mail: mail,
                pswd: password
            }
        })
        res.status(200).send({cod:1,response:user})
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({cod:0,response:error})
    }
}
// EMAIL CHECK -> RETURN 1 IF MAIL DOESN'T EXISTS
const emailCheckForExistance = async (req, res) => {
    try {
        const mail = req.params.mail

        const user = await usersSchema.findOne({
            attributes:['id_user'],
            where:{
                mail: mail
            }
        })
        res.status(200).send({cod:1,response:user})
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({cod:0,response:error})
    }
}

module.exports = { getAllUsers, patchUserSubById, loginMailPass, emailCheckForExistance }

/*
RESPONSE FORMAT:

*/
function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }
  