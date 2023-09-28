const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');


const AdminVerificationTable = db.define('AdminVerificationTable', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Admin',
            key: 'email',
        },
        unique: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
    {
        freezeTableName: true
    }
);



module.exports = AdminVerificationTable;