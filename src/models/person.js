const { DataTypes } = require('sequelize')
const sequelize     = require('../database/database')

const personSchema = sequelize.define('person',{
    id_person:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    first_name:{
        type:               DataTypes.STRING(25),
        unique:             false,
        allowNull:          false,
        validate:{
            len: [3,25]
        }
    },
    last_name:{
        type:               DataTypes.STRING(25),
        unique:             false,
        allowNull:          false,
        validate:{
            len: [3,25]
        }
    },
    gender:{
        type:               DataTypes.ENUM({
            values:             ['female', 'male', 'none']
        }),
        defaultValue:       'none',
        allowNull:          false
    },
    dni:{
        type:               DataTypes.INTEGER,
        unique:             true,
        allowNull:          false,
        validate:{
            min: 0,
            max: 99999999,
            isNumeric: true
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})











const patientSchema = require('./patient')
patientSchema.belongsTo(personSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_person',
        allowNull:      false
    },
    targetId: 'id_person'
})
const dentistSchema = require('./dentist')
dentistSchema.belongsTo(personSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_person',
        allowNull:      false
    },
    targetId: 'id_person'
})






module.exports = personSchema