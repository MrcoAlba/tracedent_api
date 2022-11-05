const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const commentSchema = sequelize.define('comment',{
    id_comment:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    rating:{
        type:               DataTypes.SMALLINT,
        unique:             false,
        allowNull:          false,
        defaultValue:       0,
        validate:{
            min:            0,
            max:            5
        }
    },
    comment:{
        type:               DataTypes.TEXT,
        unique:             true,
        allowNull:          false,
    }
},{
    freezeTableName: true,
    timestamps: false
})















const scheduleSchema = require('./schedule')
scheduleSchema.belongsTo(commentSchema,{
    foreignKey:{
        type:           DataTypes.UUID,
        name:           'id_comment',
        allowNull:      true
    },
    targetId: 'id_comment'
})









module.exports = commentSchema