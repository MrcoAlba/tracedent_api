const express = require('express')
const app = express()

// database connection

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use(require('./routes/user.routes'))
app.use(require('./routes/clinic.routes'))
app.use(require('./routes/person.routes'))
app.use(require('./routes/dentist.routes'))
app.use(require('./routes/patient.routes'))

console.log("005")
app.use(require('./routes/recruitment.routes'))
//
console.log("006")
app.use(require('./routes/speciality.routes'))
console.log("007")
app.use(require('./routes/dentistSpecialities.routes'))

//app.use(require('./routes/comment.routes'))
//app.use(require('./routes/message.routes'))
//app.use(require('./routes/schedule.routes'))
console.log("LECTURA POSTERIOR")


module.exports = app