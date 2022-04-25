const {Strategy} = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const {findByEmail} = require('../routes/users/userController');

const LocalStrategy = new Strategy(async (email, password, done) => {
    try {
        const user = await findByEmail(email);
        console.log(user.password);
        
        if (!user) {
            done(boom.unauthorized(), false)
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            done(boom.unauthorized(), false)
        }
        done(null, user);
    } catch (error) {
        done(boom.badImplementation(error), false)
    }
})


module.exports = LocalStrategy;