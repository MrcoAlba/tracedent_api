const { Op }                    = require('sequelize')
const { containsOnlyNumbers }   = require('./utils')
const usersSchema               = require('../models/user')
const clinicSchema              = require('../models/clinic')
const recruitmentSchema         = require('../models/recruitment')
const dentistSchema             = require('../models/dentist')
const personSchema              = require('../models/person')


// READ         -> GET ALL CLINICS
const getAllClinics = async (req, res) => {
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
        // Request all the clinics
        const clinics = await clinicSchema.findAndCountAll({
            attributes: ['id_clinic', 'company_name', 'ruc', 'rating'],
            order: [['company_name', 'ASC']],
            include: [{
                model: usersSchema,
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
            },],
            where: {
                company_name: {
                    [Op.like]: '%'+name+'%'
                }
            },
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = clinics.rows
        const total = clinics.count
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
// READ         -> GET ALL RECRUITS BY CLINIC_ID
const getAllRecruitsByIdClinic = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        var name    = String(req.query.name).toUpperCase()
        // Get path parameters
        const id    = req.params.id
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        if (name=='UNDEFINED'){
            name = ""
        }
        // Request all the recruits
        const recruits = await recruitmentSchema.findAndCountAll({
            attributes: ['id_recruitment','sttus','beg_date','end_date','id_dentist','id_clinic'],
            include: [{
                model: dentistSchema,
                attributes: ['id_dentist', 'ruc', 'rating'],
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
                }],
            }],
            where: {
                id_clinic: id,
            },
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = recruits.rows
        const total = recruits.count
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
// READ         -> GET ALL DENTISTS BY CLINIC_ID
const getAllDentitsByIdClinic = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        var name    = String(req.query.name).toUpperCase()
        // Get path parameters
        const id    = req.params.id
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        if (name=='UNDEFINED'){
            name = ""
        }
        // Request all the dentist
        const dentist = await recruitmentSchema.findAndCountAll({
            attributes: ['id_recruitment','sttus','beg_date','end_date','id_dentist','id_clinic'],
            include: [{
                model: dentistSchema,
                attributes: ['id_dentist', 'ruc', 'rating'],
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
                }],
            }],
            where: {
                id_clinic: id,
                sttus: 2,
            },
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = dentist.rows
        const total = dentist.count
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
// CREATE       -> POST A NEW CLINIC
const postClinic = async (req, res) => {
    try {
        // Get body parameters
        const mail          = String(req.body.mail).toUpperCase()
        const company_name  = String(req.body.company_name).toUpperCase()
        const {
            pswd, phone_number, district, direction, latitude, longitude, ruc
        } = req.body
        // Create a user
        const user = await usersSchema.create({
            user_type:      "clinic"    ,
            mail:           mail        ,
            pswd:           pswd        ,
            phone_number:   phone_number,
            district:       district    ,
            direction:      direction   ,
            latitude:       latitude    ,
            longitude:      longitude
        })
        try {
            // Create a clinic
            const clinic = await clinicSchema.create({
                company_name:   company_name,
                ruc:            ruc         ,
                id_user:        user.id_user
            })
            // Send the response
            res.status(200).send({
                message:"CLINIC CREATED",
                data:clinic,
                meta:{total: null, count:null, offset: null, limit: null}
            })
        } catch (error) {
            // Destroy the created user
            const userDestroy = await usersSchema.destroy({
                where: { id_user: user.id_user }
            })
            // If there was an error creating the user, send a message and the error object
            res.status(400).send({
                message:"ERROR CREATING THE CLINIC",
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
// LOGIN        -> RETURN THE CLINIC DATA
const loginIdUser = async (req, res) => {
    try {
        // Get body parameters
        const id_user       = req.body.id_user
        // Find the required clinic and return the data
        const clinic = await clinicSchema.findOne({
            attributes: ['id_clinic', 'company_name', 'ruc', 'rating'],
            include: [{
                model: usersSchema,
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude'],
                where: {
                    id_user: id_user
                }
            },]
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:clinic,
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
// ADD          -> RECRUIT A DENTIST
const clinitRecruitDentist = async (req, res) => {
    try {
        // Get body parameters
        const id_dentist    = req.body.id_dentist
        // Get path parameters
        const id_clinic     = req.params.id
        // Create a recruitment
        const recruitment = await recruitmentSchema.create({
            id_clinic: id_clinic, id_dentist: id_dentist
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:recruitment,
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
    getAllClinics, getAllRecruitsByIdClinic, getAllDentitsByIdClinic, postClinic, loginIdUser, clinitRecruitDentist
}