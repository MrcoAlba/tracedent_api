const { Op }                    = require('sequelize')

const recruitmentSchema         = require('../models/recruitment')






//READ      -> GET AL RECRUITMENTS
const getAllRecruitments = async (req, res) => {
    try {
        // Get query parameters
        const offset    = isNaN(parseInt(req.query.offset))                   ? null : parseInt(req.query.offset)
        const limit     = isNaN(parseInt(req.query.limit))                    ? null : parseInt(req.query.limit)
        const id_clinic = req.query.id_clinic == undefined ? ""   : req.query.id_clinic
        const id_dentist= req.query.id_dentist== undefined ? ""   : req.query.id_dentist
        // Request all the recruitment information
        var recruitment = null
        console.log("1")
        console.log("1")
        console.log("1")
        console.log(id_clinic)
        console.log(id_dentist)
        console.log("2")
        console.log("2")
        console.log("2")
        if (id_clinic.length == 32){
            recruitment = await recruitmentSchema.findAndCountAll({
                attributes: ['id_recruitment', 'beg_date', 'end_date','sttus', 'id_clinic', 'id_dentist'],
                order: [['sttus', 'ASC']],
                where:{
                    id_clinic:id_clinic
                },
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }else if(id_dentist.length == 32){
            recruitment = await recruitmentSchema.findAndCountAll({
                attributes: ['id_recruitment', 'beg_date', 'end_date','sttus', 'id_clinic', 'id_dentist'],
                order: [['sttus', 'ASC']],
                where:{
                    id_dentist:id_dentist
                },
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }else{
            recruitment = await recruitmentSchema.findAndCountAll({
                attributes: ['id_recruitment', 'beg_date', 'end_date','sttus', 'id_clinic', 'id_dentist'],
                order: [['sttus', 'ASC']],
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }
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

















module.exports = { 
    getAllRecruitments 
}