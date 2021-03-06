const  {Sequelize } = require('sequelize');

const setupModels = require('../src/db/models');
const {config} = require('../config/config');

const options = {
  dialect: 'postgres', //elijo la db que voy a utilizar
  logging: config.isProd ? false : true,
}

if(config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized:false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);
sequelize.sync({force:false})

module.exports = sequelize;
