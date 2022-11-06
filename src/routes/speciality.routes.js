const { Router }    = require('express')
const router        = Router()
const {
    getDentList, postSpeciality
}                   = require('../controllers/speciality.controller')

// READ     -> GET ALL SPECIALITIES
router.get      ('/speciality'          ,   getDentList             )
// CREATE   -> POST A NEW SPECIALITY
router.post     ('/speciality'          ,   postSpeciality          )



















module.exports = router