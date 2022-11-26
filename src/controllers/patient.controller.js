const { Op }                    = require('sequelize')

const patientSchema             = require('../models/patient')
const personSchema              = require('../models/person')
const usersSchema               = require('../models/user')




// READ     -> GET ALL PATIENTS
const getAllPatients = async (req, res) => {
    try {
        // Get query parameters
        const offset    = isNaN(parseInt(req.query.offset))                   ? null : parseInt(req.query.offset)
        const limit     = isNaN(parseInt(req.query.limit))                    ? null : parseInt(req.query.limit)
        const name      = String(req.query.name).toUpperCase() == 'UNDEFINED' ? ""   : String(req.query.name).toUpperCase()
        console.log("1")
        console.log("1")
        console.log("1")
        console.log(name)
        console.log(name)
        // Request all the patients
        const patients = await patientSchema.findAndCountAll({
            attributes: ['id_patient'],
            order: [['id_patient', 'ASC']],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
                }],
                where: {
                    first_name: {
                        [Op.like]: '%'+name+'%'
                    }
                },
            },],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        console.log(patients)
        console.log("2")
        console.log("2")
        console.log("2")
        // Get the data, total and count information
        const data = patients.rows
        const total = patients.count
        const count = data.length
        // Send the response
        res.status(200).send({
            message:"OK",
            data:data,
            meta:{total: total, count:count, offset: offset, limit: limit}
        })
    } catch (error) {
        // If there was an error, send a message and the error object
        res.status(400).send({
            message:"ERROR",
            response:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}
// CREATE   -> POST A NEW PATIENT
const postPatient = async (req, res) => {
    try {
        // Get body parameters
        const mail          = String(req.body.mail).toUpperCase()
        const first_name    = String(req.body.first_name).toUpperCase()
        const last_name     = String(req.body.last_name).toUpperCase()
        const {
            pswd, phone_number, district, direction, latitude, longitude, gender, dni
        } = req.body
        // Create a user
        const user = await usersSchema.create({
            user_type:      "patient"    ,
            mail:           mail        ,
            pswd:           pswd        ,
            phone_number:   phone_number,
            district:       district    ,
            direction:      direction   ,
            latitude:       latitude    ,
            longitude:      longitude
        })
        try {
            // Create a person
            const person = await personSchema.create({
                first_name:     first_name,
                last_name:      last_name,
                gender:         gender,
                dni:            dni,
                id_user:        user.id_user
            })
            try {
                // Create a patient
                const patient = await patientSchema.create({
                    id_person:  person.id_person
                })
                // Send the response
                res.status(200).send({
                    message:"PATIENT CREATED",
                    data:[patient],
                    meta:{total: null, count:null, offset: null, limit: null}
                })
            } catch (error) {
                // Destroy the created person
                const personDestroy = await personSchema.destroy({
                    where: { id_person: person.id_person }
                })
                // Destroy the created user
                const userDestroy = await usersSchema.destroy({
                    where: { id_user: user.id_user }
                })
                // If there was an error creating the patient, send a message and the error object
                res.status(400).send({
                    message:"ERROR CREATING THE PATIENT",
                    response:error,
                    meta:{total: null, count:null, offset: null, limit: null}
                })
            }
        } catch (error) {
            // Destroy the created user
            const userDestroy = await usersSchema.destroy({
                where: { id_user: user.id_user }
            })
            // If there was an error creating the person, send a message and the error object
            res.status(400).send({
                message:"ERROR CREATING THE PERSON",
                response:error,
                meta:{total: null, count:null, offset: null, limit: null}
            })
        }
    } catch (error) {
        // If there was an error creating the user, send a message and the error object
        res.status(400).send({
            message:"ERROR CREATING THE USER",
            response:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}
// LOGIN    -> RETURN THE PATIENT DATA
const loginIdUser = async (req, res) => {
    try {
        // Get body parameters
        const id_user       = req.body.id_user
        // Find the required patient and return the data
        const patient = await patientSchema.findOne({
            attributes: ['id_patient'],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
                }],
                where: {
                    id_user: id_user
                }
            },],
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:[patient],
            meta:{total: null, count:null, offset: null, limit: null}
        })
    } catch (error) {
        // If there was an error, send a message and the error object
        res.status(400).send({
            message:"ERROR",
            response:error,
            meta:{total: null, count:null, offset: null, limit: null}
        })
    }
}











module.exports = { 
    postPatient, getAllPatients, loginIdUser 
}