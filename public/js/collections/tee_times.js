var Collection = require('ampersand-rest-collection');
var TeeTime = require('../models/tee_time');

module.exports = Collection.extend({
  model: TeeTime,
  url: '/tee_times',

  comparator: function(model){
    return model.golf_score;
  },

  findByID: function(id) {
    return this.findWhere({id: id});
  },

  findByTournamentID: function(id) {
    return this.where({tournament_id: id});
  },

  findByTournamentAndPlayer: function(tournament_id, player_id) {
    return this.findWhere({
      tournament_id: parseInt(tournament_id),
      player_id: parseInt(player_id)
    })
  },

  findByTime: function(time) {
    return this.where({time: time});
  },

  sortByPutts: function() {
    var old_comparator = this.comparator;
    this.comparator = function(a,b){
      return a.putts < b.putts;
    };
    this.sort();
    this.comparator = old_comparator;
  },

  sortByFairways: function() {
    var old_comparator = this.comparator;
    this.comparator = function(a,b){
      return a.fairway_percentage < b.fairway_percentage;
    };
    this.sort();
    this.comparator = old_comparator;
  },

  sortByGreens: function() {
    var old_comparator = this.comparator;
    this.comparator = function(a,b){
      return a.green_percentage < b.green_percentage;
    };
    this.sort();
    this.comparator = old_comparator;
  }
});