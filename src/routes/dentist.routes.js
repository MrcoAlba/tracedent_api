const { Router }    = require('express')
const router        = Router()
const { 
    postDentist, getAllDentists, loginIdUser, addSpecialityToDentistById, getDestistByIdAllSpecialities, searchDentistById
}                   = require('../controllers/dentist.controller')

// READ         -> GET ALL DENTISTS
router.get      ('/dentist'                 ,   getAllDentists                  )
// READ         -> GET ALL DENTIST SPECIALITIES
router.get      ('/dentist/specialities/:id',   getDestistByIdAllSpecialities   )
// SEARCH       -> DENTIST PER ID
router.get      ('/dentist/:id'             ,   searchDentistById               )
// CREATE       -> POST A NEW DENTIST
router.post     ('/dentist'                 ,   postDentist                     )
// LOGIN        -> RETURN THE DENTIST DATA
router.post     ('/dentist/login'           ,   loginIdUser                     )
// CREATE       -> ADD SPECIALITY TO DENTIST BY ID
router.post     ('/dentist/speciality'      ,   addSpecialityToDentistById      )

module.exports = router