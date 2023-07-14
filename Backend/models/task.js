module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      taskName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      taskDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  

  return  Task ;

  };
  