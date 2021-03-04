var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get home');
  res.render('index', { title: 'Url Shortener Service' });
});

module.exports = router;
