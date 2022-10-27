const scheduleSchema = require('../models/schedule')

//READ      -> GET ALL SCHEDULES
const getAllSchedules = async (req, res) => {
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
            id_dentist, date, time
        } = req.body

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




module.exports = { getAllSchedules, getAllSchedulesByDentistId, getAllSchedulesByDentistIdAndClinicId, createAnScheduleForDentitstByIdAndClinicId }