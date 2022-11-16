const { Op }                    = require('sequelize')

const usersSchema               = require('../models/user')
const clinicSchema              = require('../models/clinic')
const recruitmentSchema         = require('../models/recruitment')
const dentistSchema             = require('../models/dentist')
const personSchema              = require('../models/person')
const sequelize                 = require('../database/database')


// READ         -> GET ALL CLINICS
const getAllClinics = async (req, res) => {
    try {
        // Get query parameters
        const offset    = isNaN(parseInt(req.query.offset))                   ? null : parseInt(req.query.offset)
        const limit     = isNaN(parseInt(req.query.limit))                    ? null : parseInt(req.query.limit)
        const name      = String(req.query.name).toUpperCase() == 'UNDEFINED' ? ""   : String(req.query.name).toUpperCase()
        const latitude  = isNaN(parseFloat(req.query.latitude))               ? null : parseFloat(req.query.latitude)
        const longitude = isNaN(parseFloat(req.query.longitude))              ? null : parseFloat(req.query.longitude)

        // Request all the clinics
        var clinics = null
        if (latitude==null || longitude==null){
            console.log("PRIMER TIPO DE PETICION")
            console.log("PRIMER TIPO DE PETICION")
            console.log("PRIMER TIPO DE PETICION")
            clinics = await clinicSchema.findAndCountAll({
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
        }else{
            console.log("SEGUNDO TIPO DE PETICION")
            console.log("SEGUNDO TIPO DE PETICION")
            console.log("SEGUNDO TIPO DE PETICION")

            console.log("1")
            console.log("1")
            console.log("1")
            const [resultCounter, metadataCounter] = await sequelize.query(
                "SELECT count('clinic'.'id_clinic') AS 'count' FROM  'clinic' AS 'clinic' LEFT OUTER JOIN 'users' AS 'user' ON 'clinic'.'id_user' = 'user'.'id_user' LIMIT :limit;",
                {
                    replacements: { 
                        limit: limit 
                    },type: QueryTypes.SELECT
                }
            )

            console.log("2")
            console.log("2")
            console.log("2")
            const [resultData, metadataData] = await sequelize.query(
                "SELECT clinic.id_clinic, 'clinic'.'company_name', 'clinic'.'ruc', 'clinic'.'rating', 'user'.'id_user' AS 'user.id_user', 'user'.'user_type' AS 'user.user_type', 'user'.'phone_number' AS 'user.phone_number', 'user'.'subscription' AS 'user.subscription', 'user'.'district' AS 'user.district', 'user'.'direction' AS 'user.direction', 'user'.'latitude' AS 'user.latitude', 'user'.'longitude' AS 'user.longitude', POW(69.1 * ('user'.'latitude' - :latitude), 2) + POW(69.1 * (:longitude - 'user'.'longitude') * COS('user'.'latitude' / 57.3), 2) AS distance FROM  'clinic' AS 'clinic' LEFT OUTER JOIN 'users' AS 'user' ON 'clinic'.'id_user' = 'user'.'id_user' ORDER BY distance, LIMIT :limit;",
                {
                    replacements: { 
                        latitude: latitude,
                        longitude: longitude,
                        limit: limit
                    },type: QueryTypes.SELECT
                }
            )
            console.log("3")
            console.log("3")
            console.log("3")
            console.log(resultCounter)
            console.log(resultData)
            console.log(metadataCounter)
            console.log(metadataData)
        }
        
        
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
        var offset  = parseInt(req.query.offset)
        var limit   = parseInt(req.query.limit)
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
        var offset  = parseInt(req.query.offset)
        var limit   = parseInt(req.query.limit)
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
            },],
            where: {
                id_user: id_user
            }
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