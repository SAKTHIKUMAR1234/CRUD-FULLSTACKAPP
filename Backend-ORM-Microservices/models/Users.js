const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Admin = require('./Admin')

const User = sequelize.define('Users', {
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
  dob: DataTypes.STRING,
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
  address: DataTypes.STRING,
  profilepicname: DataTypes.STRING,
  mobile:DataTypes.BIGINT,
  createdByAdminId: {
    type: DataTypes.INTEGER,
    references: {
      model: Admin,
      key: 'id',
    }
  }
},
{
  freezeTableName: true
});

module.exports = User;