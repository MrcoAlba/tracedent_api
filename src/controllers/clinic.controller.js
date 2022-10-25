const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})

const getClinics = async (req, res) => {
    try{
        const response = await pool.query('SELECT * FROM clinic;')
        res.status(200).json(response.rows)
    }catch (err){
        res.send(err)
    }
}
const getClinicById = async (req, res) => {
    try{
        const { id } = req.params
        const response = await pool.query(
            'SELECT * FROM clinic WHERE id_clinic=$1;',
            [id]
        )
        console.log(response)
        res.status(200).json(response.rows)
    }catch (err){
        res.send(err)
    }
}
const createClinic = async (req, res) => {
    try{
        const { company_name, ruc, id_user } = req.body
        const response = await pool.query(
            'INSERT INTO clinic (company_name,ruc,id_user) VALUES ($1, $2, $3);',
            [company_name, ruc, id_user]
        )
        console.log(response)
        res.status(200).json({
            message: 'Clinic created successfully',
            body: {
                user: {company_name, ruc, id_user}
            }
        })
    }catch (err){
        res.send(err)
    }
}
const deleteClinic = async (req, res) => {
    try{
        const { id } = req.params
        const response = await pool.query(
            'DELETE FROM clinic WHERE id_clinic=$1;',
            [id]
        )
        console.log(response)
        res.status(200).json(response)
    }catch(err){
        res.send(res)
    }
}
const updateClinicById = async (req, res) => {
    try{
        const { company_name, ruc, id_user } = req.body
        const { id } = req.params

        const response = await pool.query(
            'UPDATE clinic SET company_name=$1, ruc=$2, id_user=$3 WHERE id_clinic=$4;',
            [company_name, ruc, id_user, id]
        )
        console.log(response)
        res.status(200).json(response)
    }catch(err){
        res.send(res)
    }
}

module.exports = {
    getClinics, getClinicById, createClinic, deleteClinic, updateClinicById
}