const { Router } = require('express')
const router = Router()
const { 
    postDentist, getAllDentists
} = require('../controllers/dentist.controller')

// CREATE   -> POST A NEW DENTIST
router.post     ('/dentist'         ,   postDentist         )
// READ     -> GET ALL DENTISTS
router.get      ('/dentist'         ,   getAllDentists      )

module.exports = router