const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const dentistSpecialitiesSchema = require('./dentistSpecialities')

const specialitySchema = sequelize.define('speciality',{
    id_speciality:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    name:{
        type:               DataTypes.STRING,
        unique:             true,
        allowNull:          false,
        validate:{
            len: [3,50]
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})
dentistSpecialitiesSchema.belongsTo(specialitySchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_speciality',
        allowNull:      false
    },
    targetId: 'id_speciality'
})

module.exports = specialitySchema