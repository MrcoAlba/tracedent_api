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
const patchUserById = (req, res) => {
    res.send('patchUserById')
}
// DELETE   -> DELETE A USER BY ID
const deleteUserById = (req, res) => {
    res.send('deleteUserById')
}

module.exports = { postUser, getAllUsers, getUserById, patchUserById, deleteUserById }