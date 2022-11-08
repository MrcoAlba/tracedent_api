const { Router }    = require('express')
const router        = Router()
const { 
    getAllPatients, postPatient, loginIdUser
}                   = require('../controllers/patient.controller')

// READ         -> GET ALL PATIENTS
router.get      ('/patient'             ,   getAllPatients          )
// CREATE       -> POST A NEW PATIENT
router.post     ('/patient'             ,   postPatient             )
// LOGIN        -> RETURN THE PATIENT DATA
router.post     ('/patient/login'       ,   loginIdUser             )







module.exports = router