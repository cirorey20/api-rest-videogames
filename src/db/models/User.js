const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
  },
  password: {
      allowNull: false,
      type: DataTypes.STRING,
  },
  role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'user'
  }
}

class User extends Model {
  static associate(models) {
    //Associations
    this.hasMany(models.Videogame, {
        as: 'videogames',
        foreignKey: 'userId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
}