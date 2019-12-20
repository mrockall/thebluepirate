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
    'tournament/:tournament_id/leaderboard': 'leaderboard',
    'tournament/:tournament_id/my-round': 'myRound',
    'tournament/:tournament_id/my-round/:hole_id': 'myRoundHole',
    'tournament/:tournament_id/login': 'login',
    '(*path)': 'catchAll'
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  home: function () {
    this.view = 'home';

    var mainView = new LandingView({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  tournament: function(id) {
    this.redirectTo('/tournament/' + id + '/leaderboard');
  },

  leaderboard: function() {
    this.renderTournamentPageIfNotRendered();
    this.trigger('newPage', 'leaderboard');
  },

  myRound: function() {
    this.renderTournamentPageIfNotRendered();
    this.trigger('newPage', 'my_round');
  },

  renderTournamentPageIfNotRendered: function(){
    if(this.view == 'tournament')
      return;
    
    this.view = 'tournament';

    var mainView = this.view = new TournamentView({
      el: document.querySelector('.main'),
      model: window.me
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