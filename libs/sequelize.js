const  {Sequelize } = require('sequelize');

const { config } = require('../config/config.js');
const setupModels = require('../src/db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const URIPRO = config.dbUrl;

/*cuando creamos la nueva instancia de sequelize le pasamos como valor
por parametro URI, siendo la conexion que hicimos anteriormente
y ya por detras eso utiliza la conexion de pool sin problemas
*/
const sequelize = new Sequelize(URIPRO, {
  dialect: 'postgres', //elijo la db que voy a utilizar
  logging: false, //Asi se muestra cada consultan en la consola
  // ssl = {
  //   rejectUnauthorized:false
  // }
  ssl: {
    rejectUnauthorized:false
  }
});

setupModels(sequelize);

//si lo pongo en true se reinicia con cada cambio
sequelize.sync({ force: false });

module.exports = sequelize;