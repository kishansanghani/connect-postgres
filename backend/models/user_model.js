'use strict';
var bookshelf = require('../bookshelf');

var Roles = bookshelf.Model.extend({
    tableName: 'user_roles',
});

var Users = bookshelf.Model.extend({
    tableName: 'users',
    userRoles: function() {
        return this.belongsTo(Roles, 'user_roles_id');
    }
});

module.exports = Users;