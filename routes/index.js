var express = require('express');
var router = express.Router();
var fleetWiseController = require('../controllers/fleetwise');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/rank',fleetWiseController.getRank)




//
module.exports = router;
