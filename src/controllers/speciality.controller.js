const specialitySchema = require('../models/speciality')
const { Op }                    = require('sequelize')
const { containsOnlyNumbers }   = require('./utils')

// READ         -> GET ALL SPECIALITIES
const getSpecialityList = async (req, res) => {
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
        // Request all the specialities names
        const specialities = await specialitySchema.findAndCountAll({
            attributes: ['id_speciality','name'],
            order:      [['name','ASC']],
            where: {
                name: {
                    [Op.like]: '%'+name+'%'
                }
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
// CREATE       -> POST A NEW SPECIALITY
const postSpeciality = async (req, res) => {
    try {
        // Get body parameters
        const name      = String(req.body.name).toUpperCase()
        // Create a speciality
        const speciality = await specialitySchema.create({
            name:name
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:speciality,
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
    getSpecialityList, postSpeciality
}