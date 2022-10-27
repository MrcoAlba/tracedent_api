const { DataTypes, DATE, SMALLINT } = require('sequelize')
const sequelize = require('../database/database')

const scheduleSchema = sequelize.define('schedule',{
    id_schedule:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    date:{
        type:               DATE,
        allowNull:          false,
        defaultValue:       sequelize.fn('NOW')
    },
    time:{
        type:               SMALLINT,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            47
        }
    },
    sttus:{
        type:               SMALLINT,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            8
        }
    }
},{
        freezeTableName: true,
        timestamps: false
})

module.exports = scheduleSchema