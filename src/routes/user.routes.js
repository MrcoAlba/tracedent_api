const { Router } = require('express')
const router = Router()
const { 
    getAllUsers, patchUserById
} = require('../controllers/user.controller')

// READ     -> GET ALL USERS
router.get      ('/user'            ,   getAllUsers         )
// UPDATE   -> UPDATE A USER BY ID
router.patch    ('/user/:id'        ,   patchUserById       )

module.exports = router