const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')



const dentistSpecialitiesSchema = sequelize.define('dentistSpecialities',{
    
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = dentistSpecialitiesSchema