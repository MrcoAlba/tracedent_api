const { Router } = require('express')
const router = Router()
const { 
    postPerson, getAllPersons, getPersonById, patchPersonById, deletePersonById 
} = require('../controllers/person.controller')

// CREATE   -> POST A NEW PERSON
router.post     ('/person'          ,   postPerson          )
// READ     -> GET ALL PERSONS
router.get      ('/person'          ,   getAllPersons       )
// READ     -> GET PERSONS BY ID
router.get      ('/person/:id'      ,   getPersonById       )
// UPDATE   -> UPDATE A PERSON BY ID
router.patch    ('/person/:id'      ,   patchPersonById     )
// DELETE   -> DELETE A PERSON BY ID
router.delete   ('/person/:id'      ,   deletePersonById    )

module.exports = router