const { Router }    = require('express')
const router        = Router()
const {
    getAllSchedules, getAllSchedulesByDentistId, getAllSchedulesByPatientId, s0createAnScheduleForDentitstByIdAndClinicId
}                   = require('../controllers/schedule.controller')

//READ      -> GET ALL SCHEDULES
router.get      ('/schedule'                    ,   getAllSchedules                             )
//READ      -> GET ALL SCHEDULES BY DENTIST ID
router.get      ('/schedule/dentist/:id'        ,   getAllSchedulesByDentistId                  )
//READ      -> GET ALL SCHEDULES BY PATIENT ID
router.get      ('/schedule/patient/:id'        ,   getAllSchedulesByPatientId                  )
//TODO: FINISH THE LAST 3 FUNCTIONS
//CREATE   -> CREATE AN SCHEDULE BY DENTIST ID
router.post     ('/schedule/dentist'            ,   s0createAnScheduleForDentitstByIdAndClinicId)






module.exports = router