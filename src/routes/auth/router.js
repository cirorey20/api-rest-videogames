const {Router} = require('express');
const router = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const boom = require('@hapi/boom');

router.post('/login', 
    passport.authenticate('local', {session:false}),
    async(req,res, next)=> {
        try {
            const user = req.user;
            const payload = {
                sub: user.id,
                role: user.role
            }
            const token = jwt.sign(payload, JWT_SECRET);
            res.json({
                payload,
                token
            });
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router;