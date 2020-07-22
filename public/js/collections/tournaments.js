var Collection = require('ampersand-rest-collection');
var Tournament = require('../models/tournament');

module.exports = Collection.extend({
    model: Tournament,
    url: '/tournaments',

    findBySlug: function(slug) {
      return this.findWhere({slug: slug});
    },

    findByID: function(id) {
      return this.findWhere({id: id});
    }
});
