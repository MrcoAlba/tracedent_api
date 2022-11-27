const { Op }                    = require('sequelize')

const scheduleSchema            = require('../models/schedule')
const recruitmentSchema         = require('../models/recruitment')
const sequelize                 = require('../database/database')




//READ      -> GET ALL SCHEDULES
const getAllSchedules = async (req, res) => {
    try {
        // Get query parameters
        const offset    = isNaN(parseInt(req.query.offset))                   ? null : parseInt(req.query.offset)
        const limit     = isNaN(parseInt(req.query.limit))                    ? null : parseInt(req.query.limit)
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
//READ      -> GET ALL SCHEDULES BY CLINIC DENTIST AND TIME
const getAllSchedulesByClinicDentistAndTime = async (req, res) => {
    try {
        // Get query parameters
        const offset    = isNaN(parseInt(req.query.offset))                   ? null : parseInt(req.query.offset)
        const limit     = isNaN(parseInt(req.query.limit))                    ? null : parseInt(req.query.limit)
        const id_clinic = isNaN(req.query.id_clinic)                          ? "" : req.query.id_clinic
        const id_dentist= isNaN(req.query.id_dentist)                         ? "" : req.query.id_dentist
        const date      = isNaN(req.query.date)                               ? "" : req.query.date
        // Request all the schedule information
        const schedules = await scheduleSchema.findAndCountAll({
            attributes: ['id_schedule','date','time','sttus','id_patient','id_recruitment','id_dentist','id_speciality','id_comment'],
            order:      [['time','ASC']],
            include: [{
                model: recruitmentSchema,
                where: {
                    id_clinic: id_clinic
                }
            },],
            where: {
                id_dentist: id_dentist,
                date: date,
                sttus: 0
            },
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
        const offset        = isNaN(parseInt(req.query.offset))         ? null : parseInt(req.query.offset)
        const limit         = isNaN(parseInt(req.query.limit))          ? null : parseInt(req.query.limit)
        const status        = isNaN(parseInt(req.query.status))         ? 10 : (parseInt(req.query.status)<0 || parseInt(req.query.status)>9 ? 10 : parseInt(req.query.status))
        const id_clinic     = isNaN(req.query.id_clinic)                ? "" : req.query.id_clinic
        // Get path parameters
        const id_dentist    = req.params.id
        // Request all the schedule information
        var schedules = null
        if (status==10){
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
                                {[Op.like]: `%${id_clinic}%`}
                            )
                        )
                    }
                },],
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }else{
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
                        [Op.and]:(
                            sequelize.where(
                                sequelize.cast(sequelize.col('id_clinic'), 'varchar'),
                                {[Op.like]: `%${id_clinic}%`}
                            )
                        )
                    }
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
//READ      -> GET ALL SCHEDULES BY PATIENT ID (ALSO STATUS AND CLINIC ID)
const getAllSchedulesByPatientId = async (req, res) => {
    try {
        // Get query parameters
        const offset        = isNaN(parseInt(req.query.offset))         ? null : parseInt(req.query.offset)
        const limit         = isNaN(parseInt(req.query.limit))          ? null : parseInt(req.query.limit)
        const status        = isNaN(parseInt(req.query.status))         ? 10 : (parseInt(req.query.status)<0 || parseInt(req.query.status)>9 ? 10 : parseInt(req.query.status))
        const id_clinic     = isNaN(req.query.id_clinic)                ? "" : req.query.id_clinic
        // Get path parameters
        const id_patient    = req.params.id
        // Request all the schedule information
        var schedules = null
        if (status==10){
            schedules = await scheduleSchema.findAndCountAll({
                attributes: ['id_schedule','date','time','sttus','id_patient','id_recruitment','id_dentist','id_speciality','id_comment'],
                order:      [['date','ASC'],['time','ASC']],
                where: {
                    id_patient: id_patient,
                },
                include: [{
                    model: recruitmentSchema,
                    where: {
                        [Op.and]:(
                            sequelize.where(
                                sequelize.cast(sequelize.col('id_clinic'), 'varchar'),
                                {[Op.like]: `%${id_clinic}%`}
                            )
                        )
                    }
                },],
                offset:     offset,
                limit :     limit,
                subQuery:   false
            })
        }else{
            schedules = await scheduleSchema.findAndCountAll({
                attributes: ['id_schedule','date','time','sttus','id_patient','id_recruitment','id_dentist','id_speciality','id_comment'],
                order:      [['date','ASC'],['time','ASC']],
                where: {
                    id_patient: id_patient,
                    sttus: status
                },
                include: [{
                    model: recruitmentSchema,
                    where: {
                        [Op.and]:(
                            sequelize.where(
                                sequelize.cast(sequelize.col('id_clinic'), 'varchar'),
                                {[Op.like]: `%${id_clinic}%`}
                            )
                        )
                    }
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
const s0createAnScheduleForDentitstByIdAndClinicId = async (req, res) => {
    try {
        // Get body parameters
        var {
            id_recruitment, id_dentist, date, time
        } = req.body
        // Create a schedule
        console.log("gaaa")
        const schedules = await scheduleSchema.create({
            id_dentist:     id_dentist      , 
            id_recruitment: id_recruitment  , 
            date:           date            , 
            time:           time
        })
        console.log("gooooooo")
        //Send the response
        res.status(200).send({
            message:"OK",
            data:[schedules],
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
// Status 1 -> DENTISTS CANCEL SCHEDULE
const s1dentistCancelSchedule = async (req, res) => {
    try {
        // Get body parameters
        const {
            id_schedule
        } = req.body
        // Create a schedule
        const schedules = await scheduleSchema.update({
            sttus:          1
        },{
            where: {
                id_schedule : id_schedule
            }
        })

        //Send the response
        res.status(200).send({
            message:"OK",
            data:[schedules],
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
// Status 2 -> PATIENT INTENTS SCHEDULE
const s2patientIntentsSchedule = async (req, res) => {
    try {
        // Get body parameters
        const {
            id_schedule, id_patient
        } = req.body
        // Create a schedule
        const schedules = await scheduleSchema.update({
            sttus:          2,
            id_patient: id_patient
        },{
            where: {
                id_schedule : id_schedule
            }
        })

        //Send the response
        res.status(200).send({
            message:"OK",
            data:[schedules],
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
// Status 3 -> PATIENT CHOOSES SCHEDULE
const s3patientChoosesSchedule = async (req, res) => {
    try {
        // Get body parameters
        const {
            id_schedule, id_patient
        } = req.body
        // Create a schedule
        const schedules = await scheduleSchema.update({
            sttus:          3
        },{
            where: {
                id_schedule : id_schedule,
                id_patient : id_patient
            }
        })

        //Send the response
        res.status(200).send({
            message:"OK",
            data:[schedules],
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
    getAllSchedules, getAllSchedulesByClinicDentistAndTime, getAllSchedulesByDentistId, 
    getAllSchedulesByPatientId, s0createAnScheduleForDentitstByIdAndClinicId, s1dentistCancelSchedule,  
    s2patientIntentsSchedule, s3patientChoosesSchedule
}