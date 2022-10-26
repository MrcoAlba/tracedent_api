const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const clinicSchema = sequelize.define('clinic',{
    id_clinic:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    company_name:{
        type:               DataTypes.STRING,
        unique:             true,
        allowNull:          false,
    },
    ruc:{
        type:               DataTypes.BIGINT,
        unique:             true,
        allowNull:          false,
        validate:{
            len: [11,11],
            isNumeric: true
        }
    },
    rating:{
        type:               DataTypes.REAL,
        unique:             false,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            5
        }
    },
},{
    freezeTableName: true
})

module.exports = clinicSchema