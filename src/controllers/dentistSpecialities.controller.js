const dentistSpecialitiesSchema = require('../models/dentistSpecialities')

// READ     -> GET ALL DENTISTSPECIALITIES RELATIONS
const getAllDentistSpecialitiesList = async (req, res) => {
    try {
        // GET BODY`
        const dentistSpecialities = await dentistSpecialitiesSchema.findAll({

        })
        res.status(200).send({"message":dentistSpecialities})
    } catch (error) {
        res.status(500).send({"message":error})
    }
}

module.exports = { getAllDentistSpecialitiesList }