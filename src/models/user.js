const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const personSchema = require('./person')
const clinicSchema = require('./clinic')

const usersSchema = sequelize.define('users',{
    id_user:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    user_type:{
        type:               DataTypes.ENUM({
            values:             ['patient', 'dentist', 'clinic']
        }),
        defaultValue:       'patient'
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
            max: 90,
            min: -90,
        }
    },
    longitude:{
        type:               DataTypes.REAL,
        unique:             false,
        allowNull:          false,
        validate:{
            max: 180,
            min: -180,
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})

personSchema.belongsTo(usersSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_user',
        allowNull:      false
    },
    targetId: 'id_user'
})
clinicSchema.belongsTo(usersSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_user',
        allowNull:      false
    },
    targetId: 'id_user'
})

module.exports = usersSchema