const usersSchema = require("../models/user")

// CREATE   -> POST A NEW USER
const postUser = (req, res) => {
    //console.log(req.body)
    res.send('postUser')
}
// READ     -> GET ALL USERS
const getAllUsers = (req, res) => {
    res.send('getAllUsers')
}
// READ     -> GET USERS BY ID
const getUserById = (req, res) => {
    res.send('getUserById')
}
// UPDATE   -> UPDATE A USER BY ID
const patchUserById = async (req, res) => {
    try {
        const {id} = req.params.id
        
        const user = await usersSchema.update(
            { 
                subscription: true
            }, {
                where: {
                    id_user: id
                }
            }
        )
        res.status(200).json(user)
    } catch (error) {
        res.status(69).send(error)
    }
    res.send('patchUserById')
}
// DELETE   -> DELETE A USER BY ID
const deleteUserById = (req, res) => {
    res.send('deleteUserById')
}

module.exports = { postUser, getAllUsers, getUserById, patchUserById, deleteUserById }