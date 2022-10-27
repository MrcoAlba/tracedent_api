console.log("LA ARANA 01")
const specialitySchema = require('../models/speciality')
console.log("LA ARANA 02")
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
console.log("LA ARANA 03")
module.exports = { postSpeciality }