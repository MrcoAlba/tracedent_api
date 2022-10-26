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
const patchPersonById = async (req, res) => {
    try {
        const id = req.params.id
        const {
            first_name, last_name, gender, dni, phone_number, district, direction, latitude, longitude
        } = req.body
        const person = await personSchema.update({
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                dni: dni,
                phone_number: phone_number,
                district: district,
                direction: direction,
                latitude: latitude,
                longitude: longitude
            }, {
            where: {
                [Op.and]: [{
                    id_person: {
                        [Op.eq]: id
                    }
                }]
            }
        }
        )
        res.status(200).send(person)
    } catch (error) {
        // Due to a simple change in a value, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send([0])
    }
}

module.exports = { getAllPersons, patchPersonById }