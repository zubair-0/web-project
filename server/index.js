const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const model = require('./models/model.js');
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
  model.initialize();
}

app.post('/signup', user.signup);
app.post('/signin', user.signin);

app.get('/attractions', attraction.getAllAttractions);
app.put('/attractions/:id', attraction.updateAttraction);
app.post('/attractions/new', attraction.addAttraction);
app.get('/fetchAttractions/:id', attraction.getAttraction);

app.get('/restaurants', restaurant.getAllRestaurants);
app.put('/restaurants/:id', restaurant.updateRestaurant);
app.post('/restaurants/new', restaurant.addRestaurant);
app.get('/fetchRestaurants/:id', restaurant.getRestaurant);

app.get('/accomodations', accomodation.getAllAccomodations);
app.put('/accomodations/:id', accomodation.updateAccomodation);
app.post('/accomodations/new', accomodation.addAccomodation);
app.get('/fetchAccomodations/:id', accomodation.getAccomodation);

app.get('/travels', travel.getAllTravels);
app.put('/travels/:id', travel.updateTravel);
app.post('/travels/new', travel.addTravel);
app.get('/fetchTravels/:id', travel.getTravel);

start();