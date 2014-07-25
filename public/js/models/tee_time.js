var _ = require('underscore');
var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'tournament',
  props: {
    id: ['integer', true],
    tournament_id: ['integer', true],
    player_id: ['integer', true],
    time: ['time', true],
    through: ['integer', true, 0],
    score: ['integer', true, 0],
    points: ['integer', true, 0],
    position: ['integer', true, 0],
    time_parsed: ['string']
  },

  derived: {
    player_url: {
      fn: function(){
        return 'tournaments/' + this.tournament_id + '/player/' + this.player_id;
      }
    }
  },
  
  player: function(){
    return app.players.findByID(this.player_id)
  },

  findAllTeeTimes: function(){
    return app.tee_times.findByTime(this.time);
  },

  tournament: function(){
    return app.tournaments.findByID(this.tournament_id)
  },

  scores: function(){
    var scores = app.scores.findByTeeTime(this.id);
    return _(scores).sortBy(function(m){ return m.hole_id });
  },

  get_totals: function(name) {
    var scores = this.scores();
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