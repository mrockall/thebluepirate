/*global me, app*/
var _ = require('underscore');
var Router = require('ampersand-router');

// ---- Router ----
module.exports = Router.extend({
  routes: {
    '': 'home',
    'leaderboard': 'leaderboard',
    'my-round': 'myRound',
    'my-round/:hole_id': 'myRoundHole',
    'login': 'login',
    '(*path)': 'catchAll'
  },

  home: function () {
    this.trigger('newPage', 'home');
  },

  leaderboard: function() {
    this.trigger('newPage', 'leaderboard');
  },

  myRound: function() {
    this.trigger('newPage', 'my_round');
  },

  myRoundHole: function(hole_id) {
    if(!me.is_logged_in){ return this.redirectTo('/login'); }

    var tee_time = app.tee_times.findByID(me.id);
    if(!tee_time){ return this.redirectTo('/login'); }

    this.trigger('newPage', 'my_round_hole', tee_time, hole_id);
  },

  catchAll: function () {
    this.redirectTo('');
  }
});