const axios = require('axios');
const { models } = require('../../../libs/sequelize.js');
const {config} = require('../../../config/config.js');
const {mapApi} = require('../utils');

const boom = require('@hapi/boom');


async function getApiGames() { //datos desde la api
    try {
        const urlGamesTwenty = await axios.get(`${config.urlGames}?key=${config.apiKey}`);
        const urlGamesForty = await axios.get(`${config.urlGames}?key=${config.apiKey}&page=2&page_size=40`);
        const urlGamesFortyNext = await axios.get(`${config.urlGames}?key=${config.apiKey}&page=3&page_size=40`);

        const urlTwenty = mapApi(urlGamesTwenty)
        const urlForty = mapApi(urlGamesForty)
        const urlFortyNext = mapApi(urlGamesFortyNext)

        const joinUrl = [urlTwenty].concat([urlForty]).concat([urlFortyNext])

        return joinUrl

    } catch (error) {
        console.log(error)
    }
}

async function searchApiGames(name) { //datos desde la api de busqueda
    try {
        const urlGames = await axios.get(`${config.urlGames}?key=${config.apiKey}&search=${name}`);
        let arrayApi = urlGames.data.results.map((ele) => {
            return {
                id: ele.id,
                name: ele.name,
                img: ele.background_image,
                description: null,
                released: ele.released,
                rating: ele.rating,
                platforms: ele.platforms.map(el => el.platform.name),
                genres: ele.genres.map(el => el.name),
            }
        })
        return arrayApi;
    } catch (error) {
        console.log(error)
    }
}

async function detailById(id) { //detalles desde la api por ID
    try {


        if (id.length > 30) {
            // console.log(id)
            let db = await models.Videogame.findAll();
            let filterById = db.filter(el => el.dataValues.id === id)
            return filterById[0].dataValues
        } else {
            // console.log(id)
            const urlGames = await axios.get(`${config.urlGames}/${id}?key=${config.apiKey}`);
            let detailGame = urlGames.data
            return {
                id: detailGame.id,
                name: detailGame.name,
                img: detailGame.background_image,
                description: detailGame.description,
                released: detailGame.released,
                rating: detailGame.rating,
                platforms: detailGame.platforms.map(el => el.platform.name),
                genres: detailGame.genres.map(el => el.name),
            };
        }
    } catch (error) {
        console.log(error)
    }
}

async function getDbGames() { //datos desde la db
    try {

        const gamesDb = await models.Videogame.findAll({
            include: {
                model: models.Genre,
                attributes: ['name'],
                through: {//esto es una comprobacion que se realiza mediante el atributo tipos
                    attributes: [],//este atributo
                },
            }
        });
        // console.log("PRUEBA",gamesDb)
        let mapData = gamesDb.map((ele) => {
            return {
                id: ele.id,
                name: ele.name,
                img: ele.img,
                description: ele.description,
                released: ele.released,
                rating: ele.rating,
                platforms: ele.platforms,
                genres: ele.Genres ? ele.Genres.map(el=>el.name) : null,
                userId: ele.userId ? ele.userId : null, 
                createdInDb: ele.createdAt? ele.createdAt : null
            }
        })
        
        
        return mapData;
    } catch (error) {
        console.log(error)
    }
}

async function getAllGames() { //union de la api con mi db
    try {
        let api = await getApiGames();
        let db = await getDbGames();

        let uno = await api[0]
        let dos = await api[1]
        let tres = await api[2]
        
        const joinData = db.concat(uno).concat(dos).concat(tres);
        // return uno.concat(dos).concat(tres);
        return joinData;
    } catch (error) {
        console.log(error)
    }
}

// Edit Game
async function editGame(id, changes) {
    try {        

        let game = await models.Videogame.findByPk(id);
        if(!game){
            return boom.notFound('videogame not found')
        }
        const rta = await game.update(changes);
        return rta;
    } catch (error) {
        console.log(error)
    }    
}
// Crear un nuevo Videogame 
async function createGame({name, img, description, released, rating, platforms, userId, genres}) {
    try {        

        let newGame = await models.Videogame.create({
            name,
            img,
            description,
            released,
            rating,
            platforms,
            userId
        });
        if( genres ) {
            let genresAdd = await models.Genre.findAll({ where: {name: genres} });
            await newGame.addGenre(genresAdd);
        }
        return newGame;
    } catch (error) {
        console.log(error)
    }    
}


// // Delete Game
async function deleteGame(id) {
    try {
        let delet = await models.Videogame.findByPk(id);
        await delet.destroy();
        return {
            message: `Videogame ${id} deleted`
        };

    } catch (error) {
        console.log(error)
    }    
}



module.exports = {
    getDbGames,
    searchApiGames,
    detailById,
    getAllGames,
    createGame,
    editGame,
    deleteGame,
}