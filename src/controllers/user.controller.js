const usersSchema = require("../models/user")
const personSchema = require("../models/person")
const patientSchema = require("../models/patient")
const dentistSchema = require("../models/dentist")
const clinicSchema = require("../models/clinic")
const { Op } = require('sequelize')


// READ     -> GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const user = await usersSchema.findAll({
            attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
            order:[['id_user','ASC']]
        })
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}
// UPDATE   -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
const patchUserById = async (req, res) => {
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
        res.status(200).send(user)
    } catch (error) {
        // Due to a simple change in a value, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send([0])
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
        res.status(200).send([1, user])
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send([0])
    }
}

module.exports = { getAllUsers, patchUserById, loginMailPass }