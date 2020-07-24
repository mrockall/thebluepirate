var _ = require('underscore');
var AmpersandModel = require('ampersand-model');
var Player = require('../models/player');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
    putts: ['integer', false, 0],
    fairways: ['integer', false, 0],
    greens_played: ['integer', false, 0],
    fairways_played: ['integer', false, 0],
    greens_hit: ['integer', false, 0],
    fairways_hit: ['integer', false, 0],
    time_parsed: ['string']
  },

  session: {
    expanded: ['boolean', true, false]
  },

  children: {
    player: Player
  },

  derived: {
    course: {
      fn: function(){
        return this.tournament.course;
      }
    },
    player_url: {
      fn: function(){
        return '/leaderboard/' + this.player_id;
      }
    },
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
    fairway_percentage: {
      deps: ['fairways_hit', 'fairways_played'],
      fn: function(){
        if(this.fairways_played == 0) return 0;
        return (this.fairways_hit/this.fairways_played)*100;
      }
    },
    green_percentage: {
      deps: ['greens_hit', 'greens_played'],
      fn: function(){
        if(this.greens_played == 0) return 0;
        return (this.greens_hit/this.greens_played)*100;
      }
    },
    pretty_score: {
      deps: ['through', 'golf_score'],
      fn: function(){
        return this.through > 0 ? this.golf_score_pretty : "";
      }
    },
    is_expanded: {
      deps: ['expanded'],
      fn: function(){
        return this.expanded ? 'expanded' : '';
      }
    }
  },

  position: function(){
    return this.collection.models.indexOf(this) + 1;
  }, 

  pretty_through: function(){
    return this.through > 0 ? this.position() : "-"
  },

  findAllTeeTimes: function(){
    return app.tee_times.findByTime(this.time);
  },

  scores: function(){
    var scores = app.scores.findByTeeTime(this.id);
    return _(scores).sortBy(function(m){ return m.hole_id });
  },

  score_on_hole: function(hole_id){
    var score = app.scores.findByTeeTimeAndHole(this.id, hole_id);
    return score;
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