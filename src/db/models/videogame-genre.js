const { Model, DataTypes, Sequelize } = require('sequelize');

const {VIDEOGAME_TABLE} = require('./Videogame');
const {GENRE_TABLE} = require('./Genre');

const VIDEOGAME_GENRE_TABLE = 'videogames_genres';

const VideogameGenreSchema = {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    videogameId: {
        field: 'videogame_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: VIDEOGAME_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    genreId: {
        field: 'genre_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: GENRE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
}

class VideogameGenre extends Model {
    static associate(models) {
        //associations
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: VIDEOGAME_GENRE_TABLE,
            modelName: 'VideogameGenre',
            timestamps: false
        }
    }
}

module.exports = { 
    VideogameGenre, 
    VideogameGenreSchema, 
    VIDEOGAME_GENRE_TABLE 
}