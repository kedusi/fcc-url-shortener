var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var createUrl = function (url) {
  
    URL.findOne().sort("-shortUrl").exec((err, doc) => {
      if(err) console.error(err);
      
      const newUrl = new URL({
        url: url,
      });
      newUrl.shortUrl = doc ? doc.get('shortUrl') + 1 : 0
      newUrl.save();
    });
  
    URL.findOne().sort('-shortUrl').exec((err, doc) => {
      if(err) console.error(err);
  
      return {original_url: doc.url, short_url: doc.shortUrl};
    });
  }

/* Post URL to receive shortened URL */
router.post("/shorturl/new", function(req, res, next) {
    res.json(createUrl(req.url));
})

module.exports = router;