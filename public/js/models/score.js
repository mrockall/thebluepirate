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
        return this.score ? this.score : "-"
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
  }
});