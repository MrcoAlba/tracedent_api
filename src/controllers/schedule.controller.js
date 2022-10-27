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



module.exports = { getAllRecruitments, getAllSchedulesByDentistId }