const { DataTypes } = require('sequelize')
const sequelize     = require('../database/database')

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



















const scheduleSchema = require('./schedule')
scheduleSchema.belongsTo(patientSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_patient',
        allowNull:      true
    },
    targetId: 'id_patient'
})









module.exports = patientSchema