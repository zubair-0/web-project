
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const user = require('./controllers/user.js');
const model = require('./models/model.js');

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

app.get('/test', (req, res) => {
  var obj = {
    Name: 'Ali Nauman',
    Roll: 'L14-4170'
  };

  res.status = 200;
  res.json(obj);
});

app.post('/test', (req, res) => {
  console.log(req.body);
  res.status = 200;
  res.json({});
});

app.post('/signup', (req, res) => {
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  model.addUser(username, email, password)
  .then((result) => {
      res.status = 200;
      res.json({});
  })
  .catch((err) => {
      res.status = 777;
      res.json({
          'message': 'Error Signing In',
          'obj': err
      });
  });
});

start();