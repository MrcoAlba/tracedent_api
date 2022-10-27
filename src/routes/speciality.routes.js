const { Router } = require('express')
const router = Router()
const { 
    postDentist
} = require('../controllers/speciality.controller')

// CREATE   -> POST A NEW SPECIALITY
router.post     ('/speciality'         ,   postDentist         )

module.exports = router