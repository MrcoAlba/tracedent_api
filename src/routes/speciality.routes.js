const { Router }    = require('express')
const router        = Router()
const {
    getSpecialityList, postSpeciality
}                   = require('../controllers/speciality.controller')

// READ         -> GET ALL SPECIALITIES
router.get      ('/speciality'          ,   getSpecialityList       )
// CREATE       -> POST A NEW SPECIALITY
router.post     ('/speciality'          ,   postSpeciality          )



















module.exports = router