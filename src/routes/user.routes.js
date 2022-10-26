const { Router } = require('express')
const router = Router()
const {
    getAllUsers, patchUserById, loginMailPass
} = require('../controllers/user.controller')

// READ     -> GET ALL USERS
router.get      ('/user'            ,   getAllUsers         )
// UPDATE   -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
router.patch    ('/user/:id'        ,   patchUserById       )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/user/login/'     ,   loginMailPass       )

module.exports = router