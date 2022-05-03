const { Model, DataTypes, Sequelize } = require('sequelize');

const {VIDEOGAME_TABLE} = require('./Videogame');
const {GENRE_TABLE} = require('./Genre');

const VIDEOGAME_GENRE_TABLE = 'videogames_genres';

const VideogameGenreSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    videogameId: {
        field: 'videogame_id',
        allowNull: false,
        type: DataTypes.TEXT,
        references: {
            model: 'videogames',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    genreId: {
        field: 'genre_id',
        allowNull: false,
        type: DataTypes.TEXT,
        references: {
            model: 'genres',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}

class VideogameGenre extends Model {
    static associate(models) {
        //associations
        // models.Videogame.belongsToMany(models.Genre, {
        //     through: 'videogames_genres',
        //     foreignKey: 'videogame_id'
        // });
        // models.Genre.belongsToMany(models.Videogame, {
        //     through: 'videogames_genres',
        //     foreignKey: 'videogame_id'
        // });
        // this.belongsToMany(models.Genre, {through:VIDEOGAME_GENRE_TABLE})
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