const { Router } = require('express')
const router = Router()
const { 
    postDentist, getAllDentists, loginIdUser, searchDentistByName, addSpecialityToDentistById
} = require('../controllers/dentist.controller')

// CREATE   -> POST A NEW DENTIST
router.post     ('/dentist'         ,   postDentist         )
// READ     -> GET ALL DENTISTS
router.get      ('/dentist'         ,   getAllDentists      )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/dentist/login'   ,   loginIdUser       )
// SEARCH   -> DENTIST PER NAME
router.get      ('/dentist/search'  ,   searchDentistByName  )
// CREATE   -> ADD SPECIALITY TO DENTIST BY ID
router.post     ('/dentist/speciality'   ,   addSpecialityToDentistById       )

module.exports = router