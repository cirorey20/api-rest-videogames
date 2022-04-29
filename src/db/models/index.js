const {User, UserSchema} = require('./User.js');
const {Videogame, VideogameSchema} = require('./Videogame.js');
const {Genre, GenreSchema} = require('./Genre.js');
const {VideogameGenre, VideogameGenreSchema} = require('./videogame-genre.js');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Videogame.init(VideogameSchema, Videogame.config(sequelize));
    Genre.init(GenreSchema, Genre.config(sequelize));
    VideogameGenre.init(VideogameGenreSchema, VideogameGenre.config(sequelize));

    User.associate(sequelize.models);
    Genre.associate(sequelize.models);
    Videogame.associate(sequelize.models);
}

module.exports = setupModels;