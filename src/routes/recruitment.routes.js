const { Router } = require('express')
const router = Router()
const { 
    getAllRecruitments
} = require('../controllers/recruitment.controller')

//READ      -> GET AL RECRUITMENTS
router.get      ('/recruitment'     ,   getAllRecruitments      )

module.exports = router