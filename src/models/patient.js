const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const scheduleSchema = require('./schedule')

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
scheduleSchema.belongsTo(patientSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_patient',
        allowNull:      false
    },
    targetId: 'id_patient'
})

module.exports = patientSchema