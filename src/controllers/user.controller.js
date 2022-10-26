const usersSchema = require("../models/user")
const { DataTypes } = require('sequelize')


// READ     -> GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const user = await usersSchema.findAll({
            attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'] 
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
        
        const user = await usersSchema.update(
            { 
                subscription: true,
            }, {
                where: {
                    id_user: id
                }
            }
        )
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { getAllUsers, patchUserById }