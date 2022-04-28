const { Strategy, ExtractJwt } = require('passport-jwt');
const {config} = require('../../config/config');
// const { JWT_SECRET } = process.env;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    console.log("ACA ESTOY", payload)
    return done(null, payload);
});

module.exports = JwtStrategy;