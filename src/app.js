const express = require('express')
const app = express()

// database connection


// middlewares
app.use(express.json())
//app.use(express.urlencoded({extended: false}))

// routes
app.use(require('./routes/user.routes'))
app.use(require('./routes/clinic.routes'))
console.log("temporal")
console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.DATABASE)
console.log(process.env.PORT)
console.log("temporal")
//app.use(require('./routes/dentist.routes'))
//app.use(require('./routes/patient.routes'))


module.exports = app