var _              = require('underscore');
var Router         = require('ampersand-router');
var Layout         = require('./layout');
var HomePage       = require('./views/home/home');
var LoginPage      = require('./views/login/login');
var CardPage       = require('./views/card/card');
var TournamentView = require('./views/tournament/tournament');
var PlayerPage     = require('./views/player/player');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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
    var workspace = new HomePage();
    workspace.render();
    this.renderIntoLayout(workspace)
  },

  login: function () {
    var workspace = new LoginPage();
    workspace.render();
    this.renderIntoLayout(workspace);
  },

  card: function () {
    var workspace = new CardPage();
    workspace.render();
    this.renderIntoLayout(workspace);
  },

  tournament: function(id) {
    var workspace = new TournamentView();
    workspace.render();
    this.renderIntoLayout(workspace);
  },

  player: function(id) {
    var workspace = new PlayerView();
    workspace.render();
    this.renderIntoLayout(workspace);
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  renderIntoLayout: function(workspace){
    if(!this.layout){
      this.layout = new Layout({
        el: document.querySelector('body')
      });

      this.layout.render();
    }

    this.layout.renderWorkspace(workspace);
  },

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  catchAll: function () {
    this.redirectTo('');
  }
});
