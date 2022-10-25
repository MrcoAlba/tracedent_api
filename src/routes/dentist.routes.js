const { Router } = require('express')
const router = Router()
const { 
    postDentist, getAllDentists, getDentistById, patchDentistById, deleteDentistById 
} = require('../controllers/dentist.controller')

// CREATE   -> POST A NEW DENTIST
router.post     ('/dentist'         ,   postDentist         )
// READ     -> GET ALL DENTISTS
router.get      ('/dentist'         ,   getAllDentists      )
// READ     -> GET DENTISTS BY ID
router.get      ('/dentist/:id'     ,   getDentistById      )
// UPDATE   -> UPDATE A DENTIST BY ID
router.patch    ('/dentist/:id'     ,   patchDentistById    )
// DELETE   -> DELETE A DENTIST BY ID
router.delete   ('/dentist/:id'     ,   deleteDentistById   )

module.exports = router