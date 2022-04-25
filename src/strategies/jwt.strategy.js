const { Strategy, ExtractJwt } = require('passport-jwt');

const { JWT_SECRET } = process.env;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

const JwtStrategy = new Strategy(options, (payload, done) => {
    console.log("ACA ESTOY", payload)
    return done(null, payload);
});

module.exports = JwtStrategy;