const personSchema = require('../models/person')
const usersSchema = require('../models/user')
const { Op } = require('sequelize')
const { containsOnlyNumbers }   = require('./utils')





// READ         -> GET ALL PERSONS
const getAllPersons = async (req, res) => {
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
        // Request all the persons
        const persons = await personSchema.findAndCountAll({
            attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
            order: [['first_name', 'ASC']],
            include: [{
                model: usersSchema,
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
            },],
            where: {
                [Op.or]:{
                    first_name: {
                        [Op.like]: '%'+name+'%'
                    },
                    last_name: {
                        [Op.like]: '%'+name+'%'
                    }
                }
            },
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = persons.rows
        const total = persons.count
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
// UPDATE       -> UPDATE A PERSON BY ID
const updatePersonById = async (req, res) => {
    try {
        // Get body parameters
        const first_name    = String(req.body.first_name).toUpperCase()
        const last_name     = String(req.body.last_name).toUpperCase()
        const {
            gender, dni
        }                   = req.body
        // Get path parameters
        const id_person     = req.params.id
        // Update person
        const person = await personSchema.update({
                first_name:     first_name  ,
                last_name:      last_name   ,
                gender:         gender      ,
                dni:            dni         ,
            }, {
            where: {
                [Op.and]: [{
                    id_person: {
                        [Op.eq]: id_person
                    }
                }]
            }
        })
        // Send the response
        res.status(200).send({
            message:"PERSON UPDATED",
            data:person,
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

module.exports = { getAllPersons, updatePersonById }