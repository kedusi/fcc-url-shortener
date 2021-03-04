var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/* Post URL to receive shortened URL */
router.post("/shorturl/new", function(req, res, next) {
    res.json(app.createUrl(req.url));
})

module.exports = router;