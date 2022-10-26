const { Router } = require('express')
const router = Router()
const { 
    postClinic, getAllClinics
} = require('../controllers/clinic.controller')

// CREATE   -> POST A NEW CLINIC
router.post     ('/clinic'          ,   postClinic          )
// READ     -> GET ALL CLINICS
router.get      ('/clinic'          ,   getAllClinics       )

module.exports = router