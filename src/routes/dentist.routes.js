const { Router } = require('express')
const router = Router()
const { 
    postDentist, getAllDentists, loginIdUser, searchDentistByName, addSpecialityToDentistById, searchSpecialities
} = require('../controllers/dentist.controller')

// READ     -> GET ALL DENTISTS
router.get      ('/dentist'         ,   getAllDentists      )
// READ     -> GET ALL DENTIST SPECIALITIES
router.get      ('/dentist/specialities/:id', searchSpecialities    )
// SEARCH   -> DENTIST PER NAME
router.get      ('/dentist/search'  ,   searchDentistByName  )
// SEARCH   -> DENTIST PER NAME
router.get      ('/dentist/search'  ,   searchDentistByName  )

// CREATE   -> POST A NEW DENTIST
router.post     ('/dentist'         ,   postDentist         )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/dentist/login'   ,   loginIdUser       )
// CREATE   -> ADD SPECIALITY TO DENTIST BY ID
router.post     ('/dentist/speciality'   ,   addSpecialityToDentistById       )

module.exports = router