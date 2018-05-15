var express = require('express');
var router = express.Router();

var user_api = require('./user_api');

/**
FOR BACK END API
*/
router.use('/api/users', user_api);

module.exports = router;
