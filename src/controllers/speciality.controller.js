const { Op }                    = require('sequelize')

const specialitySchema          = require('../models/speciality')






// READ         -> GET ALL SPECIALITIES
const getSpecialityList = async (req, res) => {
    try {
        console.log("1")
        console.log("1")
        // Get query parameters
        var offset  = parseInt(req.query.offset)
        var limit   = parseInt(req.query.limit)
        var name    = String(req.query.name).toUpperCase()
        console.log("2")
        console.log("2")
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        console.log("3")
        console.log("3")
        if (name=='UNDEFINED'){
            name = ""
        }
        console.log("4")
        console.log("4")
        // Request all the specialities
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
        console.log("5")
        console.log("5")
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