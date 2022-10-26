const { Router } = require('express')
const router = Router()
const {
    getAllUsers, patchUserById
} = require('../controllers/user.controller')

// READ     -> GET ALL USERS
router.get      ('/user'            ,   getAllUsers         )
// UPDATE   -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
router.patch    ('/user/:id'        ,   patchUserById       )

module.exports = router