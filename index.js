const express = require('express');

const router = require('./src/routes/index.js');

const { logErrors, errorHandler } = require('./middleware/errorHandler.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send("Api VideoGames, By Ciro Rey!");
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(router)
require('./src/strategies');

app.use(logErrors);
// app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, () => {
  console.log(`Utilizando el puerto: ${port}`)
})