// CREATE   -> POST A NEW DENTIST
const postDentist = (req, res) => {
    //console.log(req.body)
    res.send('postDentist')
}
// READ     -> GET ALL DENTISTS
const getAllDentists = (req, res) => {
    res.send('getAllDentists')
}
// READ     -> GET DENTISTS BY ID
const getDentistById = (req, res) => {
    res.send('getDentistById')
}
// UPDATE   -> UPDATE A DENTIST BY ID
const patchDentistById = (req, res) => {
    res.send('patchDentistById')
}
// DELETE   -> DELETE A DENTIST BY ID
const deleteDentistById = (req, res) => {
    res.send('deleteDentistById')
}

module.exports = { postDentist, getAllDentists, getDentistById, patchDentistById, deleteDentistById }