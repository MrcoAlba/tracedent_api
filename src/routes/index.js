const { Router } = require('express')
const router = Router()

const { getClinics, getClinicById, createClinic, deleteClinic, updateClinicById } = require('../controllers/clinic.controller')

router.get('/clinic',           getClinics          )
router.get('/clinic/:id',       getClinicById       )
router.post('/clinic',          createClinic        )
router.delete('/clinic/:id',    deleteClinic        )
router.patch('/clinic/:id',     updateClinicById    )


module.exports = router