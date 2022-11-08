const { Router }    = require('express')
const router        = Router()
const {
    getAllMessages, createMessage
}                   = require('../controllers/message.controller')

// READ         -> GET ALL MESSAGES
router.patch    ('/message'              ,   getAllMessages             )
// POST         -> CREATE A MESSAGE
router.post     ('/message'              ,   createMessage              )









module.exports = router