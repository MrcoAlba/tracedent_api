const { Router }    = require('express')
const router        = Router()
const { 
    getAllRecruitments, changeRecruitmentStatusById
}                   = require('../controllers/recruitment.controller')

//READ      -> GET AL RECRUITMENTSS
router.get      ('/recruitment'     ,   getAllRecruitments      )

//STATUS CHANGE -> CHANGE RECRUITMENT STATUS
router.post      ('/recruitment/change/:id', changeRecruitmentStatusById)









module.exports = router