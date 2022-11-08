const { DataTypes } = require('sequelize')
const sequelize     = require('../database/database')

const recruitmentSchema = sequelize.define('recruitment',{
    id_recruitment:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    sttus:{
        type:               DataTypes.SMALLINT,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            4
        }
    },
    beg_date:{
        type:               DataTypes.DATE,
        allowNull:          false,
        defaultValue:       DataTypes.NOW
    },
    end_date:{
        type:               DataTypes.DATE,
        allowNull:          true,
        defaultValue:       null
    },
},{
    freezeTableName: true,
    timestamps: false
})

const scheduleSchema = require('./schedule')



scheduleSchema.belongsTo(recruitmentSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_recruitment',
        allowNull:      false
    },
    targetId: 'id_recruitment'
})







module.exports = recruitmentSchema