const { Router } = require('express')
const router = Router()

const { 
    postUser, getAllUsers, getUserById, patchUserById, deleteUserById 
} = require('../controllers/user.controller')

// CREATE   -> POST A NEW USER
router.post     ('/user'        ,   postUser        )
// READ     -> GET ALL USERS
router.get      ('/user'        ,   getAllUsers     )
// READ     -> GET USERS BY ID
router.get      ('/user/:id'    ,   getUserById     )
// UPDATE   -> UPDATE A USER BY ID
router.patch    ('/user/:id'    ,   patchUserById   )
// DELETE   -> DELETE A USER BY ID
router.delete   ('/user/:id'    ,   deleteUserById  )


module.exports = router