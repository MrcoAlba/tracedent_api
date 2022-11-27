const { Router }    = require('express')
const router        = Router()
const {
    getAllSchedules, getAllSchedulesByClinicDentistAndTime, getAllSchedulesByDentistId, getAllSchedulesByOnlyDentistId,
    getAllSchedulesByClinicId, getAllSchedulesByPatientId, s0createAnScheduleForDentitstByIdAndClinicId, 
    s1dentistCancelSchedule, s2patientIntentsSchedule, s3patientChoosesSchedule
}                   = require('../controllers/schedule.controller')

//READ      -> GET ALL SCHEDULES
router.get      ('/schedule'                    ,   getAllSchedules                             )
//READ      -> GET ALL SCHEDULES BY CLINIC DENTIST AND TIME
router.get      ('/schedule/clinic/dentist/time',   getAllSchedulesByClinicDentistAndTime       )
//READ      -> GET ALL SCHEDULES BY DENTIST ID
router.get      ('/schedule/dentist/:id'        ,   getAllSchedulesByDentistId                  )
//READ      -> GET ALL SCHEDULES BY DENTIST ID
router.get      ('/schedule/dentist/only/:id'        ,   getAllSchedulesByOnlyDentistId                  )
//READ      -> GET ALL SCHEDULES BY CLINIC ID
router.get      ('/schedule/clinic/:id'        ,   getAllSchedulesByClinicId                  )
//READ      -> GET ALL SCHEDULES BY PATIENT ID
router.get      ('/schedule/patient/:id'        ,   getAllSchedulesByPatientId                  )
//TODO: FINISH THE LAST 3 FUNCTIONS

//CREATE    -> CREATE AN SCHEDULE BY DENTIST ID
router.post     ('/schedule/dentist/0'            ,   s0createAnScheduleForDentitstByIdAndClinicId)
// Status 1 -> DENTISTS CANCEL SCHEDULE
router.post     ('/schedule/dentist/1'          ,   s1dentistCancelSchedule                     )
// Status 2 -> PATIENT INTENTS SCHEDULE
router.post     ('/schedule/patient/2'          ,   s2patientIntentsSchedule                    )
// Status 3 -> PATIENT CHOOSES SCHEDULE
router.post     ('/schedule/patient/3'          ,   s3patientChoosesSchedule                    )






module.exports = router