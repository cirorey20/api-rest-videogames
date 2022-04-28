require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,

  apiKey: process.env.API_KEY,
  urlGames: process.env.URL_GAMES,
  urlGenres: process.env.URL_GENRES,

  jwtSecret: process.env.JWT_SECRET,

  dbUrl: process.env.DATABASE_URL
}

module.exports = {
  config,
}