const { Router } = require('express')
const router = Router()
const { 
    postClinic, getAllClinics, loginIdUser, recruitDentist, getAllDentitsByIdClinic, getAllRecruitDentists
} = require('../controllers/clinic.controller')

// CREATE   -> POST A NEW CLINIC
router.post     ('/clinic'          ,   postClinic          )
// READ     -> GET ALL CLINICS
router.get      ('/clinic'          ,   getAllClinics       )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/clinic/login'    ,   loginIdUser         )

// READ     -> GET ALL AVAILABLE DENTIST BY ID_CLINIC
router.get      ('/clinic/dentists/:id',    getAllDentitsByIdClinic)
// READ     -> GET ALL RECRUITS BY ID
router.get      ('/clinic/recruit/:id',     getAllRecruitDentists )

// CREATE   -> RECRUIT A DENTIST
router.post     ('/clinic/recruit'  ,    recruitDentist     )



module.exports = router