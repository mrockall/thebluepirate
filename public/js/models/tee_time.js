var _ = require('underscore');
var AmpersandModel = require('ampersand-model');
var Player     = require('./player');
var Scores     = require('../collections/scores');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = AmpersandModel.extend({
  type: 'tee_time',

  props: {
    id: ['integer', true],
    tournament_id: ['integer', true],
    player_id: ['integer', true],
    time: ['time', true],
    through: ['integer', true, 0],
    score: ['integer', true, 0],
    points: ['integer', true, 0],
  },

  children: {
    player: Player,
  },

  collections: {
    scores: Scores
  },

  derived: {
    golf_score: {
      deps: ['points', 'through'],
      fn: function(){
        if(this.through == 0) return 9999;
        return this.through*2 - this.points;
      }
    },

    golf_score_pretty: {
      deps: ['points', 'through', 'golf_score'],
      fn: function(){
        if(this.points == this.through*2) return 'E';
        if(this.points > this.through*2) return '-' + (this.points - this.through*2);
        if(this.points < this.through*2) return '+' + (this.through*2 - this.points);
      }
    },

    pretty_score: {
      deps: ['through', 'golf_score'],
      fn: function(){
        return this.through > 0 ? this.golf_score_pretty : "";
      }
    }
  },

  url: function(){
    if(!this.id)
      return '/tee_times';

    return '/tee_times/' + this.id;
  },

  position: function(){
    return this.collection.models.indexOf(this) + 1;
  }, 

  pretty_through: function(){
    return this.through > 0 ? this.position() : "-"
  },

  score_on_hole: function(hole_id){
    return this.scores.findByHole(hole_id);
  },

  get_totals: function(name) {
    var scores = this.scores.sortBy(function(score){ 
      return score.hole_id 
    });

    if(name == "Front 9"){
      return {
        strokes: this.get_stroke_total(scores.slice(0,9)),
        points: this.get_points_total(scores.slice(0,9))
      }
    } else if(name == "Back 9"){
      return {
        strokes: this.get_stroke_total(scores.slice(9,18)),
        points: this.get_points_total(scores.slice(9,18))
      }
    } else if(name == "Total"){
      return {
        strokes: this.get_stroke_total(scores.slice(0,18)),
        points: this.get_points_total(scores.slice(0,18))
      }
    }
  },

  get_stroke_total: function(models) {
    var total = 0;
    _(models).each(function(m){
      if(m.score)
        total += m.score;
    });
    return total;
  },

  get_points_total: function(models) {
    var total = 0;
    _(models).each(function(m){
      if(m.points)
        total += m.points;
    });
    return total;
  }
});