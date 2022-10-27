const { DataTypes, DATE } = require('sequelize')
const sequelize = require('../database/database')

const dentistSpecialitiesSchema = sequelize.define('dentist_specialities',{
    id_dentist_speciality:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    beg_date:{
        type:               DATE,
        allowNull:          false,
        defaultValue:       sequelize.fn('NOW')
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = dentistSpecialitiesSchema