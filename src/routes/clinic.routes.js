const { Router } = require('express')
const router = Router()
const { 
    postClinic, getAllClinics, loginIdUser
} = require('../controllers/clinic.controller')

// CREATE   -> POST A NEW CLINIC
router.post     ('/clinic'          ,   postClinic          )
// READ     -> GET ALL CLINICS
router.get      ('/clinic'          ,   getAllClinics       )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/clinic/login'    ,   loginIdUser       )

module.exports = router