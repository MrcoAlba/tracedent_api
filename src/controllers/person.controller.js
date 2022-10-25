// CREATE   -> POST A NEW PERSON
const postPerson = (req, res) => {
    //console.log(req.body)
    res.send('postPerson')
}
// READ     -> GET ALL PERSONS
const getAllPersons = (req, res) => {
    res.send('getAllPersons')
}
// READ     -> GET PERSONS BY ID
const getPersonById = (req, res) => {
    res.send('getPersonById')
}
// UPDATE   -> UPDATE A PERSON BY ID
const patchPersonById = (req, res) => {
    res.send('patchPersonById')
}
// DELETE   -> DELETE A PERSON BY ID
const deletePersonById = (req, res) => {
    res.send('deletePersonById')
}

module.exports = { postPerson, getAllPersons, getPersonById, patchPersonById, deletePersonById }