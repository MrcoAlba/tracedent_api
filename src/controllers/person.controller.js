const personSchema = require('../models/person')
const userSchema = require('../models/user')


// CREATE   -> POST A NEW PERSON
const postPerson = (req, res) => {
    //console.log(req.body)
    res.send('postPerson')
}
// READ     -> GET ALL PERSONS
const getAllPersons = (req, res) => {
    res.send('getAllPersons')
}

module.exports = { postPerson, getAllPersons }