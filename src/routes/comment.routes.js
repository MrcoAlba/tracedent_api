const { Router }    = require('express')
const router        = Router()
const {
    getCommentList
}                   = require('../controllers/comment.controller')

// READ         -> GET ALL COMMENTS
router.get      ('/commment'            ,   getCommentList          )





















module.exports = router