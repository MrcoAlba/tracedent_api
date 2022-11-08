const { Router }    = require('express')
const router        = Router()
const {
    getAllDentistSpecialitiesList
}                   = require('../controllers/dentistSpecialities.controller')

// READ     -> GET ALL DENTISTSPECIALITIES RELATIONS
router.get      ('/dentistspeciality'      ,   getAllDentistSpecialitiesList     )











module.exports = router