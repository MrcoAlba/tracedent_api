const patientSchema = require('../models/patient')
const personSchema = require('../models/person')
const userSchema = require('../models/user')

// CREATE   -> POST A NEW PATIENT
const postPatient = async (req, res) => {
    try {
        // GET BODY`
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, first_name, last_name, gender, dni
        } = req.body

        // CREATE USER
        const user = await userSchema.create({
            user_type: "patient", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
        })

        // CREATE PERSON
        const person = await personSchema.create({
            first_name: first_name, last_name: last_name, gender: gender, dni:dni, id_user: user.id_user
        })

        // CREATE DENTIST
        const dentist = await dentistSchema.create({
            ruc:ruc, id_person: person.id_person
        })
        // RETURN RESPONSE
        res.status(200).json(dentist)
    } catch (error) {
        res.send(error)
    }
}
// READ     -> GET ALL PATIENTS
const getAllPatients = (req, res) => {
    res.send('getAllPatients')
}

module.exports = { postPatient, getAllPatients }