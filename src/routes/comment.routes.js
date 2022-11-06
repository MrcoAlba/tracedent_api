const { Router }    = require('express')
const router        = Router()
const {
    getCommentList
}                   = require('../controllers/comment.controller')

// READ         -> GET ALL COMMENTS
router.get      ('/comment'            ,   getCommentList          )





















module.exports = router