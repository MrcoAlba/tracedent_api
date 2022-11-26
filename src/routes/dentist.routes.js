const { Router }    = require('express')
const router        = Router()
const { 
    postDentist, getAllDentists, loginIdUser, addSpecialityToDentistById, getDestistByIdAllSpecialities, getDentistById
}                   = require('../controllers/dentist.controller')

// READ         -> GET ALL DENTISTS
router.get      ('/dentist'                 ,   getAllDentists                  )
// SEARCH       -> DENTIST PER ID
router.get      ('/dentist/:id'             ,   getDentistById                  )
// READ         -> GET ALL DENTIST SPECIALITIES
router.get      ('/dentist/specialities/:id',   getDestistByIdAllSpecialities   )
// CREATE       -> POST A NEW DENTIST
router.post     ('/dentist'                 ,   postDentist                     )
// LOGIN        -> RETURN THE DENTIST DATA
router.post     ('/dentist/login'           ,   loginIdUser                     )
// CREATE       -> ADD SPECIALITY TO DENTIST BY ID
router.post     ('/dentist/speciality'      ,   addSpecialityToDentistById      )

module.exports = router