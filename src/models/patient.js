const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const patientSchema = sequelize.define('patient',{
    id_patient:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = patientSchema