// CREATE   -> POST A NEW PATIENT
const postPatient = (req, res) => {
    //console.log(req.body)
    res.send('postPatient')
}
// READ     -> GET ALL PATIENTS
const getAllPatients = (req, res) => {
    res.send('getAllPatients')
}
// READ     -> GET PATIENTS BY ID
const getPatientById = (req, res) => {
    res.send('getPatientById')
}
// UPDATE   -> UPDATE A PATIENT BY ID
const patchPatientById = (req, res) => {
    res.send('patchPatientById')
}
// DELETE   -> DELETE A PATIENT BY ID
const deletePatientById = (req, res) => {
    res.send('deletePatientById')
}

module.exports = { postPatient, getAllPatients, getPatientById, patchPatientById, deletePatientById }