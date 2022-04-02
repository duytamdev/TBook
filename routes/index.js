const siteRoute = require('./site');
const storedRoute = require('./stored');
const bookRoute = require('./book');
const categoryRoute = require('./category');
const apiRoute = require('./api');
const authentication = require('../middle/authencation');

const router = (app) => {
  app.use('/stored', storedRoute);
  app.use('/book', [authentication.checkLogin], bookRoute);
  app.use('/category', [authentication.checkLogin], categoryRoute);
  app.use('/api', apiRoute);
  app.use('/', [authentication.checkLogin], siteRoute);
};

module.exports = router;
