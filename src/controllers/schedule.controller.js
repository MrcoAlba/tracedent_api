const scheduleSchema = require('../models/schedule')
const { Op }                    = require('sequelize')
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












    try {
        const schedules = await scheduleSchema.findAll({})
        res.status(200).send(schedules)
    } catch (error) {
        res.status(400).send(error)
    }
}
//READ      -> GET ALL SCHEDULES
const getAllSchedulesByDentistId = async (req, res) => {
    try {
        const id = req.query.id

        const schedules = await scheduleSchema.findAll({

            where:{
                id_dentist:id
            }
        })
        res.status(200).send(schedules)
    } catch (error) {
        res.status(400).send(error)
    }
}
//READ      -> GET ALL SCHEDULES BY DENTIST ID AND CLINIC
const getAllSchedulesByDentistIdAndClinicId = async (req, res) => {
    try {
        const id_dentist = req.query.id_dentist
        const id_clinic = req.query.id_clinic

        const schedules = await scheduleSchema.findAll({

            where:{
                id_dentist:id
            }
        })
        res.status(200).send(schedules)
    } catch (error) {
        res.status(400).send(error)
    }
}
// CREATE   -> CREATE AN SCHEDULE BY DENTIST ID
const createAnScheduleForDentitstByIdAndClinicId = async (req, res) => {
    try {
        const {
            id_dentist, id_clinic, id_recruitment, date, time
        } = req.body

        const schedules = await scheduleSchema.create({
            id_dentist:id_dentist, id_clinic:id_clinic, id_recruitment:id_recruitment, date:date, time:time
        })

        res.status(200).send(schedules)
    } catch (error) {
        res.status(400).send(error)
    }
}




module.exports = { getAllSchedules, getAllSchedulesByDentistId, getAllSchedulesByDentistIdAndClinicId, createAnScheduleForDentitstByIdAndClinicId }