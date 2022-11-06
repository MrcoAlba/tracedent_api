const { Router }    = require('express')
const router        = Router()
const { 
    getAllPersons, patchPersonById
}                   = require('../controllers/person.controller')

// READ     -> GET ALL PERSONS
router.get      ('/person'          ,   getAllPersons       )

// UPDATE   -> UPDATE A PERSON BY ID
router.patch    ('/person/:id'      ,   patchPersonById     )


















module.exports = router