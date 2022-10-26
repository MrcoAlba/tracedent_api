const { Router } = require('express')
const router = Router()
const { 
    postPerson, getAllPersons
} = require('../controllers/person.controller')

// CREATE   -> POST A NEW PERSON
router.post     ('/person'          ,   postPerson          )
// READ     -> GET ALL PERSONS
router.get      ('/person'          ,   getAllPersons       )

module.exports = router