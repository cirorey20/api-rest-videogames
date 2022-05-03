const {Router} = require('express');
const router = Router();
const passport = require('passport');
const { getAllGames, getDbGames, searchApiGames, detailById, createGame, editGame, deleteGame} = require('./videogameController');
const boom = require('@hapi/boom');
const {models} = require('../../../libs/sequelize');

router.get('/', async(req,res, next)=> { //[ ] GET /videogames 

    try {        
        
        const game = req.query.name;
        if(game) {
            //dbSearch
            let db = await getDbGames();
            let games = db.filter((el) => {
                return el.name.toLowerCase().includes(game.toLowerCase())
            })
            
            //apiSearch
            let searchApi = await searchApiGames(game);
            let limitSearch = searchApi.slice(0,15)//limito mi busqueda a primeros 15
            
            let joinSearch = games.concat(limitSearch);
            
            if(joinSearch.length > 0) {
                res.send(joinSearch); 
            } else {
                res.send([{
                    name: `No se Encontraron resultados realacionado a "${game}"`,
                    img: "https://png.pngtree.com/png-vector/20210706/ourlarge/pngtree-no-result-search-icon-png-image_3563805.jpg"
                }]);
            }
        } else {

            let apiGames = await getAllGames();
            if(!apiGames){
                boom.notFound("not-found")
            }
            res.send(apiGames)

        }
    } catch (error) {
        console.log(error)
        next(error)

    }
})

router.get('/:id', async(req,res) => {
    try {
        //dbSearch
        let db = await models.Videogame.findByPk(req.params.id)
        //api
        let getById = await detailById(req.params.id);

        if (db) res.send(db)
        else if (getById) res.send(getById)
        else res.send("No existe ese ID")
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    async(req,res, next) => {
        try {
            if(!req.body.name || !req.body.description || !req.body.platforms) {
                return res.send("needed fields")
            }
            // console.log(req.body, req.headers);
            let newGame = await createGame(req.body);
            res.send(newGame);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

router.patch('/:id', 
    passport.authenticate('jwt', {session: false}),
    async(req,res, next) => {
        try {
            const body = req.body;
            const {id} = req.params
            const videogamesUp = await editGame(id, body)
            res.send(videogamesUp)
        } catch (error) {
            // console.log(error)
            next(error)
        }
    }
)
router.delete('/:id', 
    passport.authenticate('jwt', {session: false}),
    async(req,res, next) => {
        try {
            const {id} = req.params
            const videogamesUp = await deleteGame(id);
            res.send(videogamesUp)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
)

module.exports = router;