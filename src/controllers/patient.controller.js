const patientSchema = require('../models/patient')
const personSchema = require('../models/person')
const userSchema = require('../models/user')

// CREATE   -> POST A NEW PATIENT
const postPatient = (req, res) => {
    //console.log(req.body)
    res.send('postPatient')
}
// READ     -> GET ALL PATIENTS
const getAllPatients = (req, res) => {
    res.send('getAllPatients')
}

module.exports = { postPatient, getAllPatients }