const express = require('express');
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
const image = require('./controllers/image.js');

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
  image.initialize();
  //model.initialize();
}

app.post('/test', (req, res) => {
  console.log(req.body);
  uploadImage(req.body.image).then((link) => {


    res.status = 200;
    res.json({});
  }).catch(err => {
    res.status = 401;
    res.json({message: 'Error uploading image', obj: err});
  });
});

app.post('/signup', user.signup);
app.post('/login', user.signin);

app.get('/fetchAttractions', attraction.getAllAttractions);
app.get('/fetchAttractions/:id', attraction.getAttraction);
app.post('/addAttraction', attraction.addAttraction);

app.get('/fetchRestaurants', restaurant.getAllRestaurants);
app.get('/fetchRestaurants/:id', restaurant.getRestaurant);
app.post('/addRestaurant', restaurant.addRestaurant);

app.get('/fetchAccomodations', accomodation.getAllAccomodations);
app.get('/fetchAccomodations/:id', accomodation.getAccomodation);
app.post('/addAccomodation', accomodation.addAccomodation);

app.get('/fetchTravels', travel.getAllTravels);
app.get('/fetchTravels/:id', travel.getTravel);
app.post('/addTravel', travel.addTravel);

app.post('/addFacebookUser', (req, res) => {
    var userid = req.body.userid;
    var email = req.body.email;
    var name = req.body.name;
    var accessToken = req.body.accessToken;
    var friends = req.body.friends;

    model.addFacebookUser(userid, email, name, accessToken, friends)
    .then((result) => {
        res.status = 200;
        res.json({
            'message': 'Added Successfully',
            'obj': result
        });
    })
    .catch((err) => {
        res.status = 777;
        res.json({
            'message': 'Error Adding',
            'obj': err
        });
    });
});

app.post('/getFacebookUser', (req, res) => {
    var userid = req.body.userid;
  
    model.getFacebookUser(userid)
    .then((result) => {
        res.status = 200;
        res.json({
            'message': 'Gotten Successfully',
            'obj': result
        });
    })
    .catch((err) => {
        res.status = 777;
        res.json({
            'message': 'Error Getting',
            'obj': err
        });
    });
});

app.post('/getAllFacebookUsers', (req, res) => {
    model.getAllFacebookUsers()
    .then((result) => {
        res.status = 200;
        res.json({
            'message': 'Gotten Successfully',
            'obj': result
        });
    })
    .catch((err) => {
        res.status = 777;
        res.json({
            'message': 'Error Getting',
            'obj': err
        });
    });
});

app.post('/addRestaurantRating', (req, res) => {
  var title = req.body.title;
  var user = req.body.user;
  var rating = req.body.rating;
  var review = req.body.review;
  var userid = req.body.userid;

  model.addRestaurantRating(title, user, rating, review, userid)
  .then((result) => {
      res.status = 200;
      res.json({
          'message': 'Added Successfully',
          'obj': result
      });
  })
  .catch((err) => {
      res.status = 777;
      res.json({
          'message': 'Error Adding',
          'obj': err
      });
  });
});

app.post('/getRestaurantRating', (req, res) => {
  var title = req.body.title;

  model.getRestaurantRating(title)
  .then((result) => {
      res.status = 200;
      res.json({
          'message': 'Added Successfully',
          'obj': result
      });
  })
  .catch((err) => {
      res.status = 777;
      res.json({
          'message': 'Error Adding',
          'obj': err
      });
  });
});

app.post('/addAccomodationRating', (req, res) => {
  var title = req.body.title;
  var user = req.body.user;
  var rating = req.body.rating;
  var review = req.body.review;

  model.addAccomodationRating(title, user, rating, review)
  .then((result) => {
      res.status = 200;
      res.json({
          'message': 'Added Successfully',
          'obj': result
      });
  })
  .catch((err) => {
      res.status = 777;
      res.json({
          'message': 'Error Adding',
          'obj': err
      });
  });
});

app.post('/getAccomodationRating', (req, res) => {
  var title = req.body.title;

  model.getAccomodationRating(title)
  .then((result) => {
      res.status = 200;
      res.json({
          'message': 'Added Successfully',
          'obj': result
      });
  })
  .catch((err) => {
      res.status = 777;
      res.json({
          'message': 'Error Adding',
          'obj': err
      });
  });
});

start();