const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const dentistSpecialitiesSchema = sequelize.define('dentistSpecialities',{
    id_dentist_speciality:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = dentistSpecialitiesSchema