const axios = require('axios');
const { models } = require('../../../libs/sequelize');
const {config} = require('../../../config/config');


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