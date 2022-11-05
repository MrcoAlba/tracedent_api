const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const messageSchema = sequelize.define('message',{
    id_message:{
        type:               DataTypes.UUID,
        primaryKey:         true,
        defaultValue:       DataTypes.UUIDV1
    },
    message_text:{
        type:               DataTypes.TEXT,
        unique:             false,
        allowNull:          false,
    },
    sent_datetime:{
        type:               DataTypes.DATE,
        unique:             false,
        allowNull:          false,
        defaultValue:       DataTypes.NOW
    }
},{
    freezeTableName: true,
    timestamps: false
})



























module.exports = messageSchema