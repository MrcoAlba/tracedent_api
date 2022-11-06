const dentistSpecialitiesSchema = require('../models/dentistSpecialities')

// READ     -> GET ALL DENTISTSPECIALITIES RELATIONS
const getAllDentistSpecialitiesList = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        // Request all the user information
        const dentistSpecialities = await dentistSpecialitiesSchema.findAndCountAll({
            attributes: ['id_dentist_speciality','id_speciality', 'id_dentist'],
            order:      [['id_dentist_speciality','ASC']],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = dentistSpecialities.rows
        const total = dentistSpecialities.count
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

module.exports = { getAllDentistSpecialitiesList }