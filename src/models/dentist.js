const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const dentistSchema = sequelize.define('dentist',{
    id_user:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        allowNull:          false
    },
    user_type:{
        type:               DataTypes.ENUM({
            values:             ['patient', 'dentist', 'clinic']
        }),
        defaultValue:       'patient',
        allowNull:          false
    },
    mail:{
        type:               DataTypes.STRING,
        unique:             true,
        allowNull:          false,
        validate:{
            isEmail: true
        }
    },
    pswd:{
        type:               DataTypes.STRING,
        allowNull:          false
    },
    phone_number:{
        type:               DataTypes.INTEGER,
        unique:             true,
        allowNull:          false,
        validate:{
            len: [9,9],
            isNumeric: true
        }
    },
    subscription:{
        type:               DataTypes.BOOLEAN,
        defaultValue:       false,
        allowNull:          false
    },
    district:{
        type:               DataTypes.STRING,
        unique:             false,
        allowNull:          false
    },
    direction:{
        type:               DataTypes.STRING,
        unique:             false,
        allowNull:          false
    },
    latitude:{
        type:               DataTypes.REAL,
        unique:             false,
        allowNull:          false,
        validate:{
            max: -90,
            min: 90,
        }
    },
    longitude:{
        type:               DataTypes.REAL,
        unique:             false,
        allowNull:          false,
        validate:{
            max: -180,
            min: 180,
        }
    }
},{
    freezeTableName: true
})

module.exports = dentistSchema