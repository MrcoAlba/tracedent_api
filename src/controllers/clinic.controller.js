const clinicSchema = require('../models/clinic')
const userSchema = require('../models/user')


// CREATE   -> POST A NEW CLINIC
const postClinic = async (req, res) => {
    try {
        // GET BODY
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, company_name, ruc
        } = req.body
        // CREATE USER
        const user = await userSchema.create({
            user_type: "clinic", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
        })
        // CREATE CLINIC
        const clinic = await clinicSchema.create({
            company_name: company_name, ruc: ruc, id_user: user.id_user
        })
        // RETURN RESPONSE
        res.status(200).json(clinic)
    } catch (error) {
        res.status(400).send(error)
    }
}
// READ     -> GET ALL CLINICS
const getAllClinics = async (req, res) => {
    try {
        const clinic = await clinicSchema.findAll({
            attributes: ['id_clinic', 'company_name', 'ruc', 'rating'],
            include: [{
                model: userSchema,
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
            },]
        })
        res.status(200).json(clinic)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = { postClinic, getAllClinics }