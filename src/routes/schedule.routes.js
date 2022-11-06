const { Router }    = require('express')
const router        = Router()
const {
    getAllSchedules, getAllSchedulesByDentistId, getAllSchedulesByDentistIdAndClinicId, createAnScheduleForDentitstByIdAndClinicId
}                   = require('../controllers/schedule.controller')

//READ      -> GET ALL SCHEDULES
router.get      ('/schedule'                    ,   getAllSchedules                             )
//TODO: FINISH THE LAST 3 FUNCTIONS
//READ      -> GET ALL SCHEDULES BY DENTIST ID
router.get      ('/schedule/dentist/:id'        ,   getAllSchedulesByDentistId                  )
//READ      -> GET ALL SCHEDULES BY DENTIST ID AND CLINIC
router.get      ('/schedule/dentistandclinic'   ,   getAllSchedulesByDentistIdAndClinicId       )
//CREATE   -> CREATE AN SCHEDULE BY DENTIST ID
router.post     ('/schedule/dentist'            ,   createAnScheduleForDentitstByIdAndClinicId  )















module.exports = router