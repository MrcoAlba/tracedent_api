const { Router }    = require('express')
const router        = Router()
const { 
    postClinic, getAllClinics, loginIdUser, recruitDentist, getAllDentitsByIdClinic, getAllRecruitDentists, searchClinicByName
}                   = require('../controllers/clinic.controller')

// READ     -> GET ALL CLINICS
router.get      ('/clinic'          ,   getAllClinics       )
// READ     -> GET ALL AVAILABLE DENTIST BY ID_CLINIC
router.get      ('/clinic/dentists/:id',    getAllDentitsByIdClinic)
// READ     -> GET ALL RECRUITS BY ID
router.get      ('/clinic/recruit/:id',     getAllRecruitDentists )
// SEARCH   -> CLINICS PER NAME
router.get      ('/clinics/search'  ,   searchClinicByName  )

// CREATE   -> POST A NEW CLINIC
router.post     ('/clinic'          ,   postClinic          )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/clinic/login'    ,   loginIdUser         )
// CREATE   -> RECRUIT A DENTIST
router.post     ('/clinic/recruit'  ,    recruitDentist     )








module.exports = router