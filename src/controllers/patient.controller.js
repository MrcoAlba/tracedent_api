const patientSchema = require('../models/patient')
const personSchema = require('../models/person')
const usersSchema = require('../models/user')

// CREATE   -> POST A NEW PATIENT
const postPatient = async (req, res) => {
    try {
        // GET BODY`
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, first_name, last_name, gender, dni
        } = req.body
        // CREATE USER
        const user = await usersSchema.create({
            user_type: "patient", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
        })
        try {
            // CREATE PERSON
            const person = await personSchema.create({
                first_name: first_name, last_name: last_name, gender: gender, dni: dni, id_user: user.id_user
            })
            try {
                // CREATE PATIENT
                const patient = await patientSchema.create({
                    id_person: person.id_person
                })
                res.status(200).send(patient)
            } catch (error) {
                const userDestroy = await usersSchema.destroy({
                    where: { id_user: user.id_user }
                })
                const personDestroy = await personSchema.destroy({
                    where: { id_person: person.id_person }
                })
                res.status(500).send([userDestroy, personDestroy, error.errors[0].message])
            }
        } catch (error) {
            const userDestroy = await usersSchema.destroy({
                where: { id_user: user.id_user }
            })
            res.status(500).send([userDestroy, error.errors[0].message])
        }
    } catch (error) {
        res.status(500).send(error.errors[0].message)
    }
}
// READ     -> GET ALL PATIENTS
const getAllPatients = async (req, res) => {
    try {
        const patient = await patientSchema.findAll({
            attributes: ['id_patient'],
            order: [['id_patient', 'ASC']],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
                }]
            },]
        })
        res.status(200).send(patient)
    } catch (error) {
        res.status(400).send(error)
    }
}
// LOGIN   -> RETURN 1 IF LOGIN TRUE
const loginIdUser = async (req, res) => {
    try {
        // GET BODY
        const {
            id_user
        } = req.body

        const person = await personSchema.findOne({
            attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
            where: {
                id_user: id_user
            }
        })

        const patient = await patientSchema.findOne({
            attributes: ['id_patient'],
            where: {
                id_person: person.id_person
            }
        })

        res.status(200).send({cod:1,response:patient})
        
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({cod:0,response:null})
    }
}

module.exports = { postPatient, getAllPatients, loginIdUser }