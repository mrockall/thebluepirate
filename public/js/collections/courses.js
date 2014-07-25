var Collection = require('ampersand-rest-collection');
var Course = require('../models/course');

module.exports = Collection.extend({
    model: Course,
    url: '/courses',

    findByID: function(id) {
      return this.findWhere({id: id});
    }
});