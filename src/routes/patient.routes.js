const { Router } = require('express')
const router = Router()
const { 
    postPatient, getAllPatients, loginIdUser
} = require('../controllers/patient.controller')

// CREATE   -> POST A NEW PATIENT
router.post     ('/patient'         ,   postPatient         )
// READ     -> GET ALL PATIENTS
router.get      ('/patient'         ,   getAllPatients      )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/patient/login'   ,   loginIdUser       )

module.exports = router