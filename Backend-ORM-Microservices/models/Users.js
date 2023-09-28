const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dob: DataTypes.DATE,
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
  address: DataTypes.STRING,
  profilepicname: DataTypes.STRING,
},
{
  freezeTableName: true
});

module.exports = User;