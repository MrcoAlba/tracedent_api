const { Op }                    = require('sequelize')
const { containsOnlyNumbers }   = require('./utils')
const dentistSchema             = require('../models/dentist')
const dentistSpecialitiesSchema = require('../models/dentistSpecialities')
const personSchema              = require('../models/person')
const usersSchema               = require('../models/user')
const specialitySchema          = require('../models/speciality')


// READ     -> GET ALL DENTISTS
const getAllDentists = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        var name    = String(req.query.name).toUpperCase()
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        if (name=='UNDEFINED'){
            name = ""
        }
        // Request all the dentists
        const dentists = await dentistSchema.findAndCountAll({
            attributes: ['id_dentist', 'ruc', 'rating'],
            order: [['ruc', 'ASC']],
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
        // Get the data, total and count information
        const data = dentists.rows
        const total = dentists.count
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
// READ     -> GET ALL DENTIST SPECIALITIES
const getDestistByIdAllSpecialities = async (req, res) => {
    try {
        // Get query parameters
        var offset          = req.query.offset
        var limit           = req.query.limit
        var name            = String(req.query.name).toUpperCase()
        // Get path parameters
        const id_dentist    = req.params.id
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        if (name=='UNDEFINED'){
            name = ""
        }
        // Request all the specialities
        const specialities = await dentistSpecialitiesSchema.findAndCountAll({
            attributes: ['id_dentist_speciality','id_speciality','id_dentist'],
            include: [{
                model: specialitySchema,
                attributes: ['name'],
                order: [['name', 'ASC']],
                where: {
                    name: {
                        [Op.like]: '%'+name+'%'
                    }
                },
            },],
            where: { 
                id_dentist: id_dentist 
            },
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = specialities.rows
        const total = specialities.count
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
// SEARCH   -> DENTIST PER ID
const searchDentistById = async (req, res) => {
    try {
        // Get path parameters
        const id_dentist    = req.params.id
        // Request the dentist
        const dentist = await dentistSchema.findOne({
            attributes: ['id_dentist', 'ruc', 'rating'],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
                }],
            },],
            where: {
                id_dentist: id_dentist
            },
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:dentist,
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
// CREATE   -> POST A NEW DENTIST
const postDentist = async (req, res) => {
    try {
        // Get body parameters
        const mail          = String(req.body.mail).toUpperCase()
        const first_name    = String(req.body.first_name).toUpperCase()
        const last_name     = String(req.body.last_name).toUpperCase()
        const {
            pswd, phone_number, district, direction, latitude, longitude, gender, dni, ruc
        } = req.body
        // Create a user
        const user = await usersSchema.create({
            user_type:      "dentist"   ,
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
                // Create a dentist
                const dentist = await dentistSchema.create({
                    ruc:        ruc,
                    id_person:  person.id_person
                })
                // Send the response
                res.status(200).send({
                    message:"DENTIST CREATED",
                    data:dentist,
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
                // If there was an error creating the dentist, send a message and the error object
                res.status(400).send({
                    message:"ERROR CREATING THE DENTIST",
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
// LOGIN    -> RETURN THE DENTIST DATA
const loginIdUser = async (req, res) => {
    try {
        // Get body parameters
        const id_user       = req.body.id_user
        // Find the required patient and return the data
        const dentist = await dentistSchema.findOne({
            attributes: ['id_dentist', 'ruc', 'rating'],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
                    where: {
                        id_user: id_user
                    }
                }],
            },],
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:dentist,
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
// CREATE   -> ADD SPECIALITY TO DENTIST BY ID
const addSpecialityToDentistById = async (req, res) => {
    try {
        // Get body parameters
        const id_speciality     = req.body.id_speciality
        const id_dentist        = req.body.id_dentist
        // Add speciality to the dentist
        const dentistSpeciality = await dentistSpecialitiesSchema.create({
            id_speciality:id_speciality, 
            id_dentist:id_dentist
        })

        // Send the response
        res.status(200).send({
            message:"OK",
            data:dentistSpeciality,
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
    postDentist, getAllDentists, loginIdUser, addSpecialityToDentistById, getDestistByIdAllSpecialities, searchDentistById
}