const { Router } = require('express')
const router = Router()
const { 
    postPatient, getAllPatients
} = require('../controllers/patient.controller')

// CREATE   -> POST A NEW PATIENT
router.post     ('/patient'         ,   postPatient         )
// READ     -> GET ALL PATIENTS
router.get      ('/patient'         ,   getAllPatients      )

module.exports = router