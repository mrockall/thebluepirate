var Collection = require('ampersand-rest-collection');
var Player = require('../models/player');

module.exports = Collection.extend({
    model: Player,
    url: '/players',

    findByID: function(id) {
      return this.findWhere({id: id});
    }
});