var express = require('express');
var router = express.Router();
const logger = require('../winston/logger');

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info('Express Index Page');
  res.render('index', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
  logger.error('Express Error Massage');
  res.send('Express Error Massage');
});

module.exports = router;
