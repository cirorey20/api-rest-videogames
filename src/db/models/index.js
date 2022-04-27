const {User, UserSchema} = require('./User.js');
const {Videogame, VideogameSchema} = require('./Videogame.js');
const {Genre, GenreSchema} = require('./Genre.js');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Videogame.init(VideogameSchema, Videogame.config(sequelize));
    Genre.init(GenreSchema, Genre.config(sequelize));

    User.associate(sequelize.models);
    Videogame.associate(sequelize.models);
    Genre.associate(sequelize.models);
}

module.exports = setupModels;