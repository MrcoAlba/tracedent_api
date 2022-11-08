const { Router }    = require('express')
const router        = Router()
const {
    getAllSchedules, getAllSchedulesByDentistId, createAnScheduleForDentitstByIdAndClinicId
}                   = require('../controllers/schedule.controller')

//READ      -> GET ALL SCHEDULES
router.get      ('/schedule'                    ,   getAllSchedules                             )
//READ      -> GET ALL SCHEDULES BY DENTIST ID
router.get      ('/schedule/dentist/:id'        ,   getAllSchedulesByDentistId                  )
//TODO: FINISH THE LAST 3 FUNCTIONS
//CREATE   -> CREATE AN SCHEDULE BY DENTIST ID
router.post     ('/schedule/dentist'            ,   createAnScheduleForDentitstByIdAndClinicId  )






module.exports = router