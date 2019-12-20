/*global me, app*/
var _ = require('underscore');
var Router = require('ampersand-router');

// ---- Views ----
var LandingView = require('./views/landing/index');
var TournamentView = require('./views/main');

// ---- Router ----
module.exports = Router.extend({
  routes: {
    '': 'home',
    'tournament/:tournament_id': 'tournament',
    'leaderboard': 'leaderboard',
    'my-round': 'myRound',
    'my-round/:hole_id': 'myRoundHole',
    'login': 'login',
    '(*path)': 'catchAll'
  },

  home: function () {
    var mainView = self.view = new LandingView({
      el: document.querySelector('.content')
    });

    mainView.render();
  },

  tournament: function (id) {
    var mainView = self.view = new TournamentView({
      el: document.querySelector('.content'),
      model: window.me
    });
    mainView.render();
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