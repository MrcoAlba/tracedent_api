const { Router } = require('express')
const router = Router()
const {
    getAllUsers, patchUserSubById, loginMailPass, emailCheckExistance
} = require('../controllers/user.controller')

// READ         -> GET ALL USERS
router.get      ('/user'                ,   getAllUsers             )
// EMAIL CHECK  -> CHECK IF AN EMAIL EXISTS IN OUT DB
router.get      ('/user/email/:mail'    ,   emailCheckExistance     )
// LOGIN        -> CHECK CREDENTIALS FOR LOGIN
router.post     ('/user/login'          ,   loginMailPass           )
// UPDATE       -> MODIFY THE SUBSCRIPTION TO TRUE BY ID
router.patch    ('/user/:id'            ,   patchUserSubById        )

module.exports = router