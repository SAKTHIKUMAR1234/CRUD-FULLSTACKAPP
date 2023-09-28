const Admin = require('./Admin')
const User = require('./Users')
const AdminVerificationTable = require('./AdminVerification')



User.belongsTo(Admin, { foreignKey: 'createdByAdminId' });
Admin.hasMany(User, { foreignKey: 'createdByAdminId' });
AdminVerificationTable.hasOne(Admin, {
    foreignKey: 'email',
    sourceKey: 'email',
  });
