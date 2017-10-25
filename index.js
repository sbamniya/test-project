const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');
/*Custom Files*/
const routes = require('./routes');

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(session({
  secret: 'AbCdE1F2g3H4j5KLmNOP1785',
  saveUninitialized: true,
  resave: true,
  cookie: { 
    secure: false,
    maxAge: 36000000,
    httpOnly: false // <- set httpOnly to false
  }
}));

/* Mail Setup */
global.transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
      user: 'sonu.chapter247@gmail.com',
      pass: 'sonu@247#'
  }
}));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

global.userData = {};

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'dist')));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})