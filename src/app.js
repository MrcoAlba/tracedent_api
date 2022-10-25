const express = require('express')
const app = express()

// database connection


// middlewares
app.use(express.json())
//app.use(express.urlencoded({extended: false}))

// routes
app.use(require('./routes/user.routes'))
app.use(require('./routes/clinic.routes'))
app.use(require('./routes/dentist.routes'))
app.use(require('./routes/patient.routes'))


module.exports = app