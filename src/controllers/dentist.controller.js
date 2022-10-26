const userSchema = require('../models/user')
const personSchema = require('../models/person')
const dentistSchema = require('../models/dentist')

// CREATE   -> POST A NEW DENTIST/
const postDentist = async (req, res) => {
    try {
        // GET BODY`
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, first_name, last_name, gender, dni, ruc
        } = req.body
        // CREATE USER
        const user = await userSchema.create({
            user_type: "dentist", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
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
// READ     -> GET ALL DENTISTS
const getAllDentists = async (req, res) => {
    try {
        const dentist = await dentistSchema.findAll({
            attributes: ['id_dentist', 'ruc', 'rating'],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: userSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
                }]
            },]
        })
        res.status(200).json(dentist)
    } catch (error) {
        res.status(400).json(error)
    }
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