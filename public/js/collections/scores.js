var Collection = require('ampersand-rest-collection');
var Scores = require('../models/score');

module.exports = Collection.extend({
    model: Scores,
    url: '/scores',

    findByTeeTime: function(tee_time_id) {
      return this.where({
        tee_time_id: parseInt(tee_time_id)
      })
    },

    findByTeeTimeAndHole: function(tee_time_id, hole_id) {
      return this.findWhere({
        tee_time_id: parseInt(tee_time_id),
        hole_id: parseInt(hole_id)
      })
    },

    findByHole: function(hole_id) {
      return this.findWhere({
        hole_id: parseInt(hole_id)
      })
    }
});