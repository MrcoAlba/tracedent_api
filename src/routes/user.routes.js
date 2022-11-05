const { Router } = require('express')
const router = Router()
const {
    getAllUsers, patchUserSubById, loginMailPass, emailCheckForExistance
} = require('../controllers/user.controller')

// READ     -> GET ALL USERS
router.get      ('/user'                ,   getAllUsers             )
// EMAIL CHECK -> RETURN 1 IF MAIL DOESN'T EXISTS
router.get      ('/user/email/:mail'    ,   emailCheckForExistance  )
// LOGIN   -> RETURN 1 IF LOGIN TRUE
router.post     ('/user/login'          ,   loginMailPass           )
// UPDATE   -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
router.patch    ('/user/:id'            ,   patchUserSubById        )

module.exports = router