const axios = require('axios');
const { Genere } = require('../../db.js');
const {API_KEY, URL_GENRES} = process.env;

// console.log(API_KEY);

async function getGenres() { //datos desde la api
    try {
        const urlGenres = await axios.get(`${URL_GENRES}?key=${API_KEY}`);
        
        urlGenres.data.results.map((ele) => {
            Genere.findOrCreate({
                where: {name: ele.name}
            })
        })

        const allsGenres = await Genere.findAll();
        
        return allsGenres;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getGenres,
}