const  {Sequelize } = require('sequelize');

const { config } = require('../config/config.js');
const setupModels = require('../src/db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/*cuando creamos la nueva instancia de sequelize le pasamos como valor
por parametro URI, siendo la conexion que hicimos anteriormente
y ya por detras eso utiliza la conexion de pool sin problemas
*/
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', //elijo la db que voy a utilizar
  logging: true, //Asi se muestra cada consultan en la consola
});

setupModels(sequelize);

//si lo pongo en true se reinicia con cada cambio
sequelize.sync({ force: false });

module.exports = sequelize;