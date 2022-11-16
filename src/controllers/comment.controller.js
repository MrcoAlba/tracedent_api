const { Op }                    = require('sequelize')

const commentSchema             = require("../models/comment")






// READ         -> GET ALL COMMENTS
const getCommentList = async (req, res) => {
    try {
        // Get query parameters
        var offset  = parseInt(req.query.offset)
        var limit   = parseInt(req.query.limit)
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        // Request all the comments
        const comments = await commentSchema.findAndCountAll({
            attributes: ['id_comment','rating','comment'],
            order:      [['id_comment','ASC']],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = comments.rows
        const total = comments.count
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

















module.exports = {
    getCommentList
}