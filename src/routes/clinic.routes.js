const { Router }    = require('express')
const router        = Router()
const { 
    getAllClinics, getAllRecruitsByIdClinic, getAllDentitsByIdClinic, postClinic, loginIdUser, clinitRecruitDentist
}                   = require('../controllers/clinic.controller')

// READ         -> GET ALL CLINICS
router.get      ('/clinic'              ,   getAllClinics           )
// READ         -> GET CLINIC INFORMATION
router.get      ('/clinic/:id'              ,   getAllClinics           )
// READ         -> GET ALL RECRUITS BY CLINIC_ID
router.get      ('/clinic/recruits/:id' ,   getAllRecruitsByIdClinic)
// READ         -> GET ALL DENTISTS BY CLINIC_ID
router.get      ('/clinic/dentists/:id' ,   getAllDentitsByIdClinic )
// CREATE       -> POST A NEW CLINIC
router.post     ('/clinic'              ,   postClinic              )
// LOGIN        -> RETURN THE CLINIC DATA
router.post     ('/clinic/login'        ,   loginIdUser             )
// CREATE       -> RECRUIT A DENTIST
router.post     ('/clinic/recruit/:id'  ,   clinitRecruitDentist    )

module.exports = router