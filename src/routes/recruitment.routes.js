const { Router }    = require('express')
const router        = Router()
const { 
    getAllRecruitments
}                   = require('../controllers/recruitment.controller')

//READ      -> GET AL RECRUITMENTSS
router.get      ('/recruitment'     ,   getAllRecruitments      )











module.exports = router