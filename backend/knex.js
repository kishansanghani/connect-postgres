var environment = process.env.NODE_ENV || 'development';
var config = require('./config.js')[environment];
//config.client.pool.removeAllListeners("error")
//config.client.pool.removeAllListeners("warn")

module.exports = require('knex')(config);
