var express = require('express');
var router = express.Router();
var product = require('../model/product');
/* GET home page. */
router.get('/', function(req, res, next) {
  let data = product.find();
  console.log(data);
  res.render('index', { title: 'Express' });
});

module.exports = router;
