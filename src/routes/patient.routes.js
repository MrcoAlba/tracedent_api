const { Router }    = require('express')
const router        = Router()
const { 
    getAllPatients, getPatientById, postPatient, loginIdUser
}                   = require('../controllers/patient.controller')

// READ         -> GET ALL PATIENTS
router.get      ('/patient'             ,   getAllPatients          )
// SEARCH       -> PATIENT PER ID
router.get      ('/patient/:id'         ,   getPatientById          )
// CREATE       -> POST A NEW PATIENT
router.post     ('/patient'             ,   postPatient             )
// LOGIN        -> RETURN THE PATIENT DATA
router.post     ('/patient/login'       ,   loginIdUser             )







module.exports = router