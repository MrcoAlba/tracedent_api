const specialitySchema = require('../models/speciality')

// CREATE   -> POST A NEW DENTIST/
const postSpeciality = async (req, res) => {
    try {
        // GET BODY`
        const {
            name
        } = req.body
        const speciality = await specialitySchema.create({
            name:name
        })
        res.status(200).send({"message":speciality})
    } catch (error) {
        res.status(500).send({"message":error.errors[0].message})
    }
}

module.exports = { postSpeciality }