const { DataTypes, DATE, SMALLINT } = require('sequelize')
const sequelize = require('../database/database')

const scheduleSchema = require('./schedule')

const recruitmentSchema = sequelize.define('recruitment',{
    id_recruitment:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    sttus:{
        type:               SMALLINT,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            3
        }
    },
    beg_date:{
        type:               DATE,
        allowNull:          false,
        defaultValue:       sequelize.fn('NOW')
    },
    end_date:{
        type:               DATE,
        allowNull:          true,
        defaultValue:       null
    },

},{
        freezeTableName: true,
        timestamps: false
})
scheduleSchema.belongsTo(recruitmentSchema,{
    foreignKey: {
        type:           DataTypes.UUID,
        name:           'id_recruitment',
        allowNull:      false
    },
    targetId: 'id_recruitment'
})

module.exports = recruitmentSchema