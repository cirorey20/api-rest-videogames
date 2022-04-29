const { Model, DataTypes, Sequelize } = require('sequelize');

const VIDEOGAME_TABLE = 'videogames';

const VideogameSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  released: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.DOUBLE
  },
  platforms: {
    type: DataTypes.JSON,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Videogame extends Model {
  static associate(models) {
    //Associations
    this.belongsTo(models.User, {
      as: 'user'
    });
    this.belongsToMany(models.Genre, {
      through: models.VideogameGenre,
      foreignKey: 'videogameId',
      otherKey: 'genreId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEOGAME_TABLE,
      modelName: 'Videogame',
      timestamps: false
    }
  }
}

module.exports = {
  VIDEOGAME_TABLE,
  VideogameSchema,
  Videogame,
}
