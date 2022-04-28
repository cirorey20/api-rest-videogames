const axios = require('axios');
const { models } = require('../../../libs/sequelize');
// const {API_KEY, URL_GENRES} = process.env;
const {config} = require('../../../config/config');

// console.log(API_KEY);

async function getGenres() { //datos desde la api
    try {
        const urlGenres = await axios.get(`${config.urlGenres}?key=${config.apiKey}`);
        
        urlGenres.data.results.map((ele) => {
            models.Genre.findOrCreate({
                where: {name: ele.name}
            })
        })

        const allsGenres = await models.Genre.findAll();
        
        return allsGenres;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getGenres,
}