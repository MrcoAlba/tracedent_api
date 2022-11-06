const { Router }    = require('express')
const router        = Router()
const {
    getAllMessages
}                   = require('../controllers/message.controller')

// READ         -> GET ALL MESSAGES
router.patch      ('/message'              ,   getAllMessages           )






















module.exports = router