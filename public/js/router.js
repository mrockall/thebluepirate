/*global me, app*/
var _ = require('underscore');
var Router = require('ampersand-router');

// ---- Views ----
var HomePage = require('./views/home/home');
// var TournamentView = require('./views/tournament/tournament');

// ---- Router ----
module.exports = Router.extend({
  routes: {
    '': 'home',
    'tournament/:tournament_id': 'tournament',

    // 'tournament/:tournament_id/leaderboard': 'leaderboard',
    // 'tournament/:tournament_id/my-round': 'myRound',
    // 'tournament/:tournament_id/my-round/:hole_id': 'myRoundHole',
    // 'tournament/:tournament_id/login': 'login',
    '(*path)': 'catchAll'
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  home: function () {
    var mainView = new HomePage({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  tournament: function(id) {
    var mainView = new TournamentView({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  myRoundHole: function(hole_id) {
    if(!me.is_logged_in){ return this.redirectTo('/login'); }

    var tee_time = app.tee_times.findByID(me.id);
    if(!tee_time){ return this.redirectTo('/login'); }

    this.trigger('newPage', 'my_round_hole', tee_time, hole_id);
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  catchAll: function () {
    this.redirectTo('');
  }
});