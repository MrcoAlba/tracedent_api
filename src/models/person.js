const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const personSchema = sequelize.define('person',{
    id_person:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        allowNull:          false
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

module.exports = personSchema