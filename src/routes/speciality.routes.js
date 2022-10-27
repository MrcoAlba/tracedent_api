console.log("TEMPORAL 01")
const { Router } = require('express')
console.log("TEMPORAL 02")
const router = Router()
console.log("TEMPORAL 03")
const { 
    postDentist
} = require('../controllers/speciality.controller')
console.log("TEMPORAL 04")
// CREATE   -> POST A NEW SPECIALITY
router.post     ('/speciality'         ,   postDentist         )
console.log("TEMPORAL 05")
module.exports = router