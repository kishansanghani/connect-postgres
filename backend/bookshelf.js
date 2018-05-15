var environment = process.env.NODE_ENV || 'development';
var config = require('./config.js')[environment];
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;
