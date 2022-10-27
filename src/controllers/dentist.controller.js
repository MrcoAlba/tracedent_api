const { Op } = require('sequelize')

const dentistSchema = require('../models/dentist')
const personSchema = require('../models/person')
const usersSchema = require('../models/user')

// CREATE   -> POST A NEW DENTIST/
const postDentist = async (req, res) => {
    try {
        // GET BODY`
        const {
            mail, pswd, phone_number, district, direction, latitude, longitude, first_name, last_name, gender, dni, ruc
        } = req.body
        // CREATE USER
        const user = await usersSchema.create({
            user_type: "dentist", mail: mail, pswd: pswd, phone_number: phone_number, district: district, direction: direction, latitude: latitude, longitude: longitude
        })
        try {
            // CREATE PERSON
            const person = await personSchema.create({
                first_name: first_name, last_name: last_name, gender: gender, dni: dni, id_user: user.id_user
            })
            try {
                // CREATE DENTIST
                const dentist = await dentistSchema.create({
                    ruc: ruc, id_person: person.id_person
                })
                res.status(200).send(dentist)
            } catch (error) {
                const userDestroy = await usersSchema.destroy({
                    where: { id_user: user.id_user }
                })
                const personDestroy = await personSchema.destroy({
                    where: { id_person: person.id_person }
                })
                res.status(500).send({"message":error.errors[0].message})
            }
        } catch (error) {
            const userDestroy = await usersSchema.destroy({
                where: { id_user: user.id_user }
            })
            res.status(500).send({"message":error.errors[0].message})
        }
    } catch (error) {
        res.status(500).send({"message":error.errors[0].message})
    }
}
// READ     -> GET ALL DENTISTS
const getAllDentists = async (req, res) => {
    try {
        const dentist = await dentistSchema.findAll({
            attributes: ['id_dentist', 'ruc', 'rating'],
            order: [['ruc', 'ASC']],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
                }]
            },]
        })
        res.status(200).send(dentist)
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

        const person = await personSchema.findOne({
            attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
            where: {
                id_user: id_user
            }
        })

        const dentist = await dentistSchema.findOne({
            attributes: ['id_dentist', 'ruc', 'rating'],
            where: {
                id_person: person.id_person
            }
        })

        res.status(200).send({cod:1,response:dentist})
        
    } catch (error) {
        // Due to a simple change in a values, if the return is 0, 
        //it means that the value wasn't modified
        res.status(500).send({cod:0,response:null})
    }
}

const searchDentistByName = async (req, res) => {
    try {
        var name = req.query.name;


        const dentist = await dentistSchema.findAll({
            attributes: ['id_dentist', 'ruc', 'rating'],
            order: [['ruc', 'ASC']],
            include: [{
                model: personSchema,
                attributes: ['id_person', 'first_name', 'last_name', 'gender', 'dni'],
                where: {
                    first_name: {
                        [Op.like]: '%'+name+'%'
                    }

                },
                include: [{
                    model: usersSchema,
                    attributes: ['id_user', 'user_type', 'phone_number', 'subscription', 'district', 'direction', 'latitude', 'longitude']
                }]
            },]
        })

        res.status(200).send({ clinic })

    } catch (error) {
        res.status(400).send({ cod: 0, response: error })
    }
}

module.exports = { postDentist, getAllDentists, loginIdUser, searchDentistByName }