const { Model, DataTypes, Sequelize } = require('sequelize');

const GENRE_TABLE = 'genres';

const GenreSchema = {
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
}

class Genre extends Model {
  static associate(models) {

    // this.belongsToMany(models.Videogame, {
    //   through: models.VideogameGenre,
    //   foreignKey: 'videogameId',
    //   otherKey: 'genreId'
    // });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_TABLE,
      modelName: 'Genre',
      timestamps: false
    }
  }
}

module.exports = {
  GENRE_TABLE,
  GenreSchema,
  Genre,
};

