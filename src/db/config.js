const { config } = require('../../config/config.js');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  
  production: {
    url: config.dbUrl,
    use_env_variable: 'DATABASE_URL', //IMPORTANTE si quiero hacer deploy en sequelize con un ORM
    dialect: 'postgresql',
    logging: false,
        dialectOptions: {
      ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false 
      }
    },
  }
}