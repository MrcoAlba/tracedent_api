const usersSchema = require("../models/user")
const { DataTypes, Op } = require('sequelize')


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
// UPDATE   -> UPDATE A USER BY ID
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
        res.status(500).send(error)
    }
}

module.exports = { getAllUsers, patchUserById }