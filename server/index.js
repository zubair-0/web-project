const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const user = require('./controllers/user.js');
const attraction = require('./controllers/attraction.js');
const accomodation = require('./controllers/accomodation.js');
const restaurant = require('./controllers/restaurant.js');
const travel = require('./controllers/travel.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', port);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = (process.env.NODE_ENV !== 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);
  
  // Listen the server
  app.listen(port, host);
  console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
  user.initialize();
}

app.post('/signup', user.signup);
app.post('/signin', user.signin);

app.get('/attractions', attraction.getAllAttractions);
app.post('/attractions', attraction.addAttraction);
app.post('/attractions/:id', attraction.updateAttraction);

app.get('/accomodations', accomodation.getAllAccomodations);
app.post('/accomodations', accomodation.addAccomodation);
app.post('/accomodations/:id', accomodation.updateAccomodation);

app.get('/restaurants', restaurant.getAllRestaurants);
app.post('/restaurants', restaurant.addRestaurant);
app.post('/restaurants/:id', restaurant.updateRestaurant);

app.get('/travels', travel.getAllTravels);
app.post('/travels', travel.addTravel);
app.post('/travels/:id', travel.updateTravel);

start();