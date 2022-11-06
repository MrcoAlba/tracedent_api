const { DataTypes } = require('sequelize')
const sequelize     = require('../database/database')

const specialitySchema = sequelize.define('speciality',{
    id_speciality:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    name:{
        type:               DataTypes.STRING(100),
        unique:             true,
        allowNull:          false,
        validate:{
            len: [2,100]
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})

















const dentistSpecialitiesSchema = require('./dentistSpecialities')
dentistSpecialitiesSchema.belongsTo(specialitySchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_speciality',
        allowNull:      false
    },
    targetId: 'id_speciality'
})
const scheduleSchema = require('./schedule')
scheduleSchema.belongsTo(specialitySchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_speciality',
        allowNull:      true
    },
    targetId: 'id_speciality'
})






module.exports = specialitySchema