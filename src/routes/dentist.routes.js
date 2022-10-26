const { Router } = require('express')
const router = Router()
const { 
    postDentist, getAllDentists, loginIdUser
} = require('../controllers/dentist.controller')

// CREATE   -> POST A NEW DENTIST
router.post     ('/dentist'         ,   postDentist         )
// READ     -> GET ALL DENTISTS
router.get      ('/dentist'         ,   getAllDentists      )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/dentist/login'   ,   loginIdUser       )

module.exports = router