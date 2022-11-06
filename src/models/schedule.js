const { DataTypes } = require('sequelize')
const sequelize     = require('../database/database')

const scheduleSchema = sequelize.define('schedule',{
    id_schedule:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    date:{
        type:               DataTypes.DATE,
        allowNull:          false
    },
    time:{
        type:               DataTypes.SMALLINT,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            47
        }
    },
    sttus:{
        type:               DataTypes.SMALLINT,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            9
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})

























module.exports = scheduleSchema