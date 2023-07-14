module.exports = (sequelize, DataTypes) => {
    const UsersRole = sequelize.define('UsersRole', {
      role: {
        type: DataTypes.ENUM('Admin', 'Student', 'Teacher'),
        allowNull: false
      },
    });
    return  UsersRole;
  };
  