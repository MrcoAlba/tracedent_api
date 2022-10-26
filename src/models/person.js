const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const dentistSchema = require('./dentist')
//const patientSchema = require('./patient')




const personSchema = sequelize.define('person',{
    id_person:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    first_name:{
        type:               DataTypes.STRING,
        unique:             false,
        allowNull:          false,
        validate:{
            len: [3,25]
        }
    },
    last_name:{
        type:               DataTypes.STRING,
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
            len: [8,8],
            isNumeric: true
        }
    }
},{
    freezeTableName: true
})

dentistSchema.belongsTo(personSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_person',
        allowNull:      false
    },
    targetId: 'id_person'
})
/*patientSchema.belongsTo(personSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_person',
        allowNull:      false
    },
    targetId: 'id_person'
})*/

module.exports = personSchema