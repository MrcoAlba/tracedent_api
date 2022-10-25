const { Router } = require('express')
const router = Router()

const { 
    postClinic, getAllClinics, getClinicById, patchClinicById, deleteClinicById 
} = require('../controllers/clinic.controller')

// CREATE   -> POST A NEW CLINIC
router.post     ('/clinic'        ,   postClinic        )
// READ     -> GET ALL CLINICS
router.get      ('/clinic'        ,   getAllClinics     )
// READ     -> GET CLINICS BY ID
router.get      ('/clinic/:id'    ,   getClinicById     )
// UPDATE   -> UPDATE A CLINIC BY ID
router.patch    ('/clinic/:id'    ,   patchClinicById   )
// DELETE   -> DELETE A CLINIC BY ID
router.delete   ('/clinic/:id'    ,   deleteClinicById  )


module.exports = router