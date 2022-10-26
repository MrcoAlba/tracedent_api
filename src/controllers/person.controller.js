const personSchema = require('../models/person')
const userSchema = require('../models/user')


// READ     -> GET ALL PERSONS
const getAllPersons = async (req, res) => {
    try {
        const person = await personSchema.findAll({
            attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
            order: [['dni', 'ASC']],
            include: [{
                model: userSchema,
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
            },]
        })
        res.status(200).send(person)
    } catch (error) {
        res.status(400).send(error)
    }
}
// UPDATE   -> UPDATE A PERSON BY ID
const patchPersonById = (req, res) => {
    
}

module.exports = { getAllPersons, patchPersonById }