const { Router } = require('express')
const router = Router()
const { 
    postClinic, getAllClinics, loginIdUser, recruitDentist, getAllDentitsByIdClinic
} = require('../controllers/clinic.controller')

// CREATE   -> POST A NEW CLINIC
router.post     ('/clinic'          ,   postClinic          )
// READ     -> GET ALL CLINICS
router.get      ('/clinic'          ,   getAllClinics       )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/clinic/login'    ,   loginIdUser         )
// ADD      -> RECRUIT A DENTIST
router.post     ('/clinic/recruit'  ,    recruitDentist     )
// READ     -> GET ALL DENTIST BY ID_CLINIC
router.get      ('/clinic/dentists'  ,    getAllDentitsByIdClinic)

module.exports = router