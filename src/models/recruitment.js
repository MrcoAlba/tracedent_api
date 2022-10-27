const { DataTypes, TIME, DATE } = require('sequelize')
const sequelize = require('../database/database')







const recruitmentSchema = sequelize.define('recruitment',{
    id_recruitment:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    beg_date:{
        type:               DataTypes.DATE,
        allowNull:          false,
        defaultValue:       sequelize.fn('NOW')
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

module.exports = recruitmentSchema