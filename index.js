const express = require('express');
// const cors = require('cors');
const router = require('./src/routes/index.js');

const { logErrors, errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send("Api VideoGames, By Ciro Rey!");
})

require('./src/strategies');
// const whitelist = ['http://localhost:3000', 'https://myapiboyar.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'))
//     }
//   }
// }
// app.use(cors(options));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(router)
app.use(logErrors);
app.use(errorHandler);




app.listen(port, () => {
  console.log(`Utilizando el puerto: ${port}`)
})