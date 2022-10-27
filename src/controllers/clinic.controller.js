const usersSchema = require('../models/user')
const clinicSchema = require('../models/clinic')
const recruitmentSchema = require('../models/recruitment')
const dentistSchema = require('../models/dentist')


// CREATE   -> POST A NEW CLINIC
const postClinic = async (req, res) => {
    try {
        // GET BODY
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, company_name, ruc
        } = req.body
        // CREATE USER
        const user = await usersSchema.create({
            user_type: "clinic", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
        })
        // CREATE CLINIC
        try {
            const clinic = await clinicSchema.create({
                company_name: company_name, ruc: ruc, id_user: user.id_user
            })
            // RETURN RESPONSE
            res.status(200).send(clinic)
        } catch (error) {
            const userDestroy = await usersSchema.destroy({
                where: { id_user: user.id_user }
            })
            res.status(500).send([userDestroy, error.errors[0].message])
        }
    } catch (error) {
        res.status(500).send(error.errors[0].message)
    }
}
// READ     -> GET ALL CLINICS
const getAllClinics = async (req, res) => {
    try {
        const clinic = await clinicSchema.findAll({
            attributes: ['id_clinic', 'company_name', 'ruc', 'rating'],
            order: [['company_name', 'ASC']],
            include: [{
                model: usersSchema,
                attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
            },]
        })
        res.status(200).send(clinic)
    } catch (error) {
        res.status(400).send(error)
    }
}
// LOGIN   -> RETURN 1 IF LOGIN TRUE
const loginIdUser = async (req, res) => {
    try {
        // GET BODY
        const {
            id_user
        } = req.body

        const clinic = await clinicSchema.findOne({
            attributes: ['id_clinic', 'company_name', 'ruc', 'rating'],
            where: {
                id_user: id_user
            }
        })

        res.status(200).send({ cod: 1, response: clinic })
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({ cod: 1, response: null })
    }
}
// ADD      -> RECRUIT A DENTIST
const recruitDentist = async (req, res) => {
    try {
        // GET BODY
        const {
            id_clinic, id_dentist
        } = req.body

        const recruitment = await recruitmentSchema.create({
            id_clinic: id_clinic, id_dentist: id_dentist
        })

        res.status(200).send({ cod: 1, response: recruitment })
    } catch (error) {
        res.status(500).send({ cod: 0, response: error })
    }
}
// READ     -> GET ALL DENTIST BY ID_CLINIC
const getAllDentitsByIdClinic = async (req, res) => {
    try {
        const id = req.params.id

        const dentist = await recruitmentSchema.findAll({
            attributes: ['id_dentist'],
            include: [{
                model: dentistSchema,
                attributes: ['id_dentist', 'rating'],
                include: [{
                    model: pergsonSchema,
                    attributes: ['first_name', 'last_name']
                },]
            }],
            /*
            where:[
                id_clinic = id
            ]*/
        })
        res.status(200).send({ cod: 1, response: dentist })
    } catch (error) {
        res.status(400).send({ cod: 0, response: null })
    }
}

module.exports = { postClinic, getAllClinics, loginIdUser, recruitDentist, getAllDentitsByIdClinic }