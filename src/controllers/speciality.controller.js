const { Op }                    = require('sequelize')

const specialitySchema          = require('../models/speciality')






// READ         -> GET ALL SPECIALITIES
const getSpecialityList = async (req, res) => {
    try {
        // Get query parameters
        const offset    = isNaN(parseInt(req.query.offset))                   ? null : parseInt(req.query.offset)
        const limit     = isNaN(parseInt(req.query.limit))                    ? null : parseInt(req.query.limit)
        const name      = String(req.query.name).toUpperCase() == 'UNDEFINED' ? ""   : String(req.query.name).toUpperCase()
        const id_speciality= req.query.id == 'undefined' ? ""   : req.query.id
        // Request all the specialities
        const specialities = await specialitySchema.findAndCountAll({
            attributes: ['id_speciality','name'],
            order:      [['name','ASC']],
            where: {
                name: {
                    [Op.like]: '%'+name+'%',
                },
                id_speciality: {
                    [Op.like]: '%'+id_speciality+'%',
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