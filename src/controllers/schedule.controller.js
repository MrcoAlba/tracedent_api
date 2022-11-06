const scheduleSchema            = require('../models/schedule')
const recruitmentSchema         = require('../models/recruitment')
const { Op }                    = require('sequelize')
const sequelize                 = require('../database/database')
const { containsOnlyNumbers }   = require('./utils')

//READ      -> GET ALL SCHEDULES
const getAllSchedules = async (req, res) => {
    try {
        // Get query parameters
        var offset  = req.query.offset
        var limit   = req.query.limit
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        // Request all the schedule information
        const schedules = await scheduleSchema.findAndCountAll({
            attributes: ['id_schedule','date','time','sttus','id_patient','id_recruitment','id_dentist','id_speciality','id_comment'],
            order:      [['date','ASC']],
            offset:     offset,
            limit :     limit,
            subQuery:   false
        })
        // Get the data, total and count information
        const data = schedules.rows
        const total = schedules.count
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
























































//READ      -> GET ALL SCHEDULES BY DENTIST ID (ALSO STATUS AND CLINIC ID)
const getAllSchedulesByDentistId = async (req, res) => {
    try {
        // Get query parameters
        var offset          = req.query.offset
        var limit           = req.query.limit
        var status          = req.query.status 
        var id_clinic       = req.query.id_clinic
        // Get path parameters
        const id_dentist    = req.params.id
        // Validate if query parameters are valid
        if (!containsOnlyNumbers(offset) || !containsOnlyNumbers(limit)){
            offset = null
            limit = null
        }
        if (id_clinic==null){
            id_clinic=''
        }
        if (!containsOnlyNumbers(status)){
            status = 10
        }else if (status < 0 && status > 9){
            status = 10
        }
        status = parseInt(status)
        // Request all the schedule information
        var schedules = null
        console.log("ANTESSSSS")
        console.log("ANTESSSSS")
        console.log("ANTESSSSS")
        if (status==10){
            console.log("1")
            console.log("1")
            console.log("1")
            schedules = await scheduleSchema.findAndCountAll({
                attributes: ['id_schedule','date','time','sttus','id_patient','id_recruitment','id_dentist','id_speciality','id_comment'],
                order:      [['date','ASC'],['time','ASC']],
                where: {
                    id_dentist: id_dentist,
                },
                include: [{
                    model: recruitmentSchema,
                    where: {
                        [Op.and]:(
                            sequelize.where(
                                sequelize.cast(sequelize.col('id_clinic'), 'varchar'),
                                {[Op.iLike]: `%${id_clinic}%`}
                            )
                        )
                    }
                },],
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }else{
            console.log("2")
            console.log("2")
            console.log("2")
            schedules = await scheduleSchema.findAndCountAll({
                attributes: ['id_schedule','date','time','sttus','id_patient','id_recruitment','id_dentist','id_speciality','id_comment'],
                order:      [['date','ASC'],['time','ASC']],
                where: {
                    id_dentist: id_dentist,
                    sttus: status
                },
                include: [{
                    model: recruitmentSchema,
                    where: {
                        id_clinic: {
                            [Op.like]: '%'+id_clinic+'%'
                        }
                    },
                },],
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }
        // Get the data, total and count information
        const data = schedules.rows
        const total = schedules.count
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




















































// CREATE   -> CREATE AN SCHEDULE BY DENTIST ID
const createAnScheduleForDentitstByIdAndClinicId = async (req, res) => {
    try {
        // Get body parameters
        var {
            id_clinic, id_recruitment, id_dentist, date, time
        } = req.body
        // Create a schedule
        const schedules = await scheduleSchema.create({
            id_dentist:     id_dentist      , 
            id_clinic:      id_clinic       , 
            id_recruitment: id_recruitment  , 
            date:           date            , 
            time:           time
        })
        // Send the response
        res.status(200).send({
            message:"OK",
            data:schedules,
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




module.exports = { getAllSchedules, getAllSchedulesByDentistId, createAnScheduleForDentitstByIdAndClinicId }