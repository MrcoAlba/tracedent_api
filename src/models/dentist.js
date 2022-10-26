const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

//const recruitmentSchema = require('./recruitment')
//const dentistSpecialitiesSchema = require('./dentistSpecialities')




const dentistSchema = sequelize.define('dentist',{
    id_dentist:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
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
    freezeTableName: true,
    timestamps: false
})
/*
recruitmentSchema.belongsTo(dentistSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_dentist',
        allowNull:      false
    },
    targetId: 'id_dentist'
})
dentistSpecialitiesSchema.belongsTo(dentistSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_dentist',
        allowNull:      false
    },
    targetId: 'id_dentist'
})
*/
module.exports = dentistSchema