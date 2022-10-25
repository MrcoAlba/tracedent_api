const { Router } = require('express')
const router = Router()
const { 
    postPatient, getAllPatients, getPatientById, patchPatientById, deletePatientById 
} = require('../controllers/patient.controller')

// CREATE   -> POST A NEW PATIENT
router.post     ('/patient'         ,   postPatient         )
// READ     -> GET ALL PATIENTS
router.get      ('/patient'         ,   getAllPatients      )
// READ     -> GET PATIENTS BY ID
router.get      ('/patient/:id'     ,   getPatientById      )
// UPDATE   -> UPDATE A PATIENT BY ID
router.patch    ('/patient/:id'     ,   patchPatientById    )
// DELETE   -> DELETE A PATIENT BY ID
router.delete   ('/patient/:id'     ,   deletePatientById   )

module.exports = router