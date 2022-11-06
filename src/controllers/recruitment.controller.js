const recruitmentSchema = require('../models/recruitment')
const { Op }                    = require('sequelize')
const { containsOnlyNumbers }   = require('./utils')






//READ      -> GET AL RECRUITMENTS
const getAllRecruitments = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        // Request all the recruitment information
        const recruitment = await recruitmentSchema.findAndCountAll({
            attributes: ['id_recruitment', 'beg_date', 'end_date','sttus', 'id_clinic', 'id_dentist'],
            order: [['sttus', 'ASC']],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = recruitment.rows
        const total = recruitment.count
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

module.exports = { getAllRecruitments }