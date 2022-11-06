const usersSchema = require("../models/user")
const { Op } = require('sequelize')
const { containsOnlyNumbers } = require('./utils')

// READ         -> GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        // Request all the user information
        const user = await usersSchema.findAndCountAll({
            attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
            order:      [['id_user','ASC']],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = user.rows
        const total = user.count
        const count = data.length
        // Send the response
        res.status(200).send({
            message:"OK",
            data:data,
            meta:{total: total, count:count, offset: offset, limit: limit}
        })
    } catch (error) {
        // If there was an error, send a message and the error object
        res.status(400).send({
            message:"ERROR",
            response:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}
// EMAIL CHECK  -> CHECK IF AN EMAIL EXISTS IN OUT DB
const emailCheckExistance = async (req, res) => {
    try {
        // Get path parameters
        const mail = req.params.mail
        // Search if exists the email in our database
        const mailExistance = await usersSchema.findOne({
            attributes:['id_user'],
            where:{
                mail: mail
            }
        })
        // Send the response
        if (mailExistance!=null){
            // Send this if email does exists
            res.status(200).send({
                message:"Does exists",
                data:mailExistance,
                meta:{total: null, count:null, offset: null, limit: null}
            })
        }else{
            // Send this if email does not exists
            res.status(200).send({
                message:"Does not exists",
                data:mailExistance,
                meta:{total: null, count:null, offset: null, limit: null}
            })
        }
    } catch (error) {
        // If there was an error, send a message and the error object
        res.status(400).send({
            message:"ERROR!",
            data:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}
// LOGIN        -> CHECK CREDENTIALS FOR LOGIN
const loginMailPass = async (req, res) => {
    try {
        // Get body parameters
        const mail      = req.body.mail
        const password  = req.body.password
        // Find the required user and check credentials
        const userInformation = await usersSchema.findOne({
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
                where: {
                    mail: mail,
                    pswd: password
        }})
        // Send the response
        if (userInformation!=null){
            // Send this if credentials are correct
            res.status(200).send({
                message:"OK",
                data:userInformation,
                meta:{total: null, count:null, offset: null, limit: null}
            })
        }else{
            // Send this if credentials are incorrect
            res.status(401).send({
                message:"BAD CREDENTIALS",
                data:userInformation,
                meta:{total: null, count:null, offset: null, limit: null}
            })
        }
    } catch (error) {
        // If there was an error, send a message and the error object
        res.status(400).send({
            message:"ERROR!",
            data:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}
// UPDATE       -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
const patchUserSubById = async (req, res) => {
    try {
        // Get path parameters
        const id = req.params.id
        // Update the user if it's not a patient
        const updatedUsers = await usersSchema.update({
                subscription: true,
            }, {
                where: {
                    [Op.and]: [
                        {id_user: {[Op.eq]: id}}, 
                        {user_type: {[Op.not]: "patient"}}
                    ]
                }
            }
        )
        // Send the response
        res.status(200).send({
            message:"OK",
            data:updatedUsers,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    } catch (error) {
        // If there was an error, send a message and the error object
        res.status(400).send({
            message:"ERROR!",
            data:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}

module.exports = { 
    getAllUsers, emailCheckExistance, loginMailPass, patchUserSubById 
}