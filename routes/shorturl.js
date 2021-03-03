var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser());
/* Post URL to receive shortened URL */
router.post("/api/shorturl/new", function(req, res, next) {
    res.render('index', {title: req.body.name});
})

module.exports = router;