const {Router} = require('express');
const router = Router();
const {getGenres, genresByIdUser} = require('./genereController');

router.get('/', async(req,res) => {
    try {
        let genres = await getGenres();
        res.send(genres)
    } catch (error) {
        console.log(error)
    }
})
router.get('/id-user/:id', async(req,res) => {
    try {
        let genres = await genresByIdUser(req.params.id);
        res.send(genres)
    } catch (error) {
        console.log(error)
    }
})

// router.post('/genero', async(req,res)=> {
//     try {
//         let nombre = req.body.name;
//         if (nombre) {
//             let crearGenero = await models.Genere.create({name: nombre});
//             res.send(crearGenero);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = router;