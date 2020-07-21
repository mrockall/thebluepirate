var _      = require('underscore');
var Router = require('ampersand-router');

// ---- Views ----
var HomePage       = require('./views/home/home');
var LoginPage       = require('./views/login/login');
var CardPage       = require('./views/card/card');
var TournamentView = require('./views/tournament/tournament');
var PlayerPage       = require('./views/player/player');

// ---- Router ----
module.exports = Router.extend({
  routes: {
    '': 'home',
    'login': 'login',
    'card': 'card',
    'tournament/:tournament_id': 'tournament',
    'player/:player_id': 'player',
    '(*path)': 'catchAll'
  },

  home: function () {
    var mainView = new HomePage({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  login: function () {
    var mainView = new LoginPage({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  card: function () {
    var mainView = new CardPage({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  tournament: function(id) {
    var mainView = new TournamentView({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  player: function(id) {
    var mainView = new PlayerView({
      el: document.querySelector('.main')
    });

    mainView.render();
  },

  catchAll: function () {
    this.redirectTo('');
  }
});
