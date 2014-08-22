var _ = require('underscore');
var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'score',
  props: {
    id: ['integer', true],
    tee_time_id: ['integer', true],
    hole_id: ['integer', true],
    player_id: ['integer', true],
    score: ['integer'],
    putts: ['integer'],
    fairway: ['integer'],
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
    },
    pretty_putts: {
      deps: ['putts'],
      fn: function() {
        return _.isNull(this.putts) ? "-" : this.putts
      }
    },
    pretty_fairway: {
      deps: ['fairway'],
      fn: function() {
        return _.isNull(this.fairway) ? "-" : (this.fairway ? "Y" : "N")
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