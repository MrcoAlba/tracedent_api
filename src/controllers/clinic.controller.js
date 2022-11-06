const usersSchema               = require('../models/user')
const clinicSchema              = require('../models/clinic')
const recruitmentSchema         = require('../models/recruitment')
const dentistSchema             = require('../models/dentist')
const personSchema              = require('../models/person')
const { Op }                    = require('sequelize')



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
                }],
            }],
            where: {
                id_clinic: id,
                // TODO: Implement this
                /*first_name: {
                    [Op.like]: '%'+name+'%'
                }*/
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
                }],
            }],
            where: {
                id_clinic: id,
                sttus: 2,
                // TODO: Implement this
                /*first_name: {
                    [Op.like]: '%'+name+'%'
                }*/
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
// CREATE   -> POST A NEW CLINIC
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


// TODO: FINISH THIS 2

// LOGIN   -> RETURN 1 AND THE CLINIC OBJECT... REMEMBER THAT THE USERS ROUTE IS GONNA MAKE THE LOGIN LOGIC
const loginIdUser = async (req, res) => {
    try {
        // GET BODY
        const {
            id_user
        } = req.body

        const clinic = await clinicSchema.findOne({
            attributes: ['id_clinic', 'company_name', 'ruc', 'rating'],
            where: {
                id_user: id_user
            }
        })

        res.status(200).send({ cod: 1, response: clinic })
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({ cod: 0, response: null })
    }
}
// ADD      -> RECRUIT A DENTIST
const recruitDentist = async (req, res) => {
    try {
        // GET BODY
        const {
            id_clinic, id_dentist
        } = req.body

        const recruitment = await recruitmentSchema.create({
            id_clinic: id_clinic, id_dentist: id_dentist
        })

        res.status(200).send({ cod: 1, response: recruitment })
    } catch (error) {
        res.status(500).send({ cod: 0, response: error })
    }
}


module.exports = { getAllClinics, getAllRecruitsByIdClinic, getAllDentitsByIdClinic, postClinic, loginIdUser, recruitDentist }