var _ = require('underscore');
var AmpersandModel = require('ampersand-model');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = AmpersandModel.extend({
  type: 'score',

  props: {
    id: ['integer', true],
    tee_time_id: ['integer', true],
    hole_id: ['integer', true],
    player_id: ['integer', true],
    score: ['integer'],
    points: ['integer'],
    result: ['string']
  },

  derived: {
    pretty_score: {
      deps: ['score'],
      fn: function() {
        return _.isNull(this.score) ? "-" : this.score
      }
    },

    pretty_points: {
      deps: ['points'],
      fn: function() {
        return _.isNull(this.points) ? "-" : this.points
      }
    }
  },

  // This is a bit lazy..
  // It's to prevent us sending the whole model to the server
  // during a save.
  toJSON: function(options){
    return _.extend(this.changedAttributes(), {
      id: this.id
    })
  }
});
