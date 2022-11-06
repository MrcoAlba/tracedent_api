const messageSchema             = require("../models/message")
const { Op }                    = require('sequelize')






// READ         -> GET ALL MESSAGES
const getAllMessages = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        // Get body parameters
        const from          = req.body.from
        const destination   = req.body.destination
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        // Request all the persons
        const messages = await messageSchema.findAndCountAll({
            attributes: ['id_message','message_text','sent_datetime','id_from','id_destination'],
            order: [['sent_datetime', 'ASC']],
            where: {
                [Op.or]:[
                    {
                        [Op.and]:[{
                            id_from: from,
                        },{
                            id_destination: destination
                        }]
                    },
                    {
                        [Op.and]:[{
                            id_from: destination,
                        },{
                            id_destination: from
                        }]
                    }
                ]
            },
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = messages.rows
        const total = messages.count
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
// POST         -> CREATE A MESSAGE
const createMessage = async (req, res) => {
    try {
        // Get body parameters
        const from          = req.body.from
        const destination   = req.body.destination
        const message_text  = req.body.message_text
        // Create the message
        const message = await messageSchema.create({
            message_text:   message_text,
            id_from:        from,
            id_destination: destination
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:message,
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
    getAllMessages, createMessage
}