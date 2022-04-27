const {Router} = require('express');
const router = Router();
const { getUsers, createUser, findUser } = require('./userController');

router.get('/', async(req,res) => {
    try {
        let users = await getUsers();
        res.send(users)
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', async(req,res) => {
    try {
        const user = await findUser(req.params.id);
        res.send(user);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async(req,res) => {
    try {
        let user = await createUser(req.body);
        res.send(user)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;