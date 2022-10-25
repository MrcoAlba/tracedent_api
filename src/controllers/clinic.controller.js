const clinicSchema = require('../models/clinic')
const userSchema = require('../models/user')

// CREATE   -> POST A NEW CLINIC
const postClinic = async (req, res) => {
    try {
        console.log(req.body)
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, company_name, ruc
        } = req.body
        const user = await userSchema.create({
            user_type: "clinic", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
        })
        const clinic = await clinicSchema.create({
            company_name: company_name, ruc: ruc, id_user: user.id_user
        })
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
// READ     -> GET CLINICS BY ID
const getClinicById = (req, res) => {
    res.send('getClinicById')
}
// UPDATE   -> UPDATE A CLINIC BY ID
const patchClinicById = (req, res) => {
    res.send('patchClinicById')
}
// DELETE   -> DELETE A CLINIC BY ID
const deleteClinicById = (req, res) => {
    res.send('deleteClinicById')
}

module.exports = { postClinic, getAllClinics, getClinicById, patchClinicById, deleteClinicById }