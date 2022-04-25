const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogames = require('./videogames/router');
const Genres = require('./generes/router');
const Users = require('./users/router');
const auth = require('./auth/router');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//users
router.use('/users', Users);

router.use('/videogames', Videogames);
router.use('/videogame', Videogames);

//auth
router.use('/auth', auth);

//genres
router.use('/genres', Genres);


module.exports = router;
