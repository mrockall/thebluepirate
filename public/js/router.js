/*global me, app*/
var _ = require('underscore');
var Router = require('ampersand-router');

var HomePage = require('./pages/home');
var LoadingPage = require('./pages/loading');
var ProfilePage = require('./pages/profile');
var EditTournamentPage = require('./pages/tournaments/edit');
var ViewTournamentPage = require('./pages/tournaments/view');
var TournamentPlayerPage = require('./pages/tournaments/player');
var MyRoundPage = require('./pages/my_round/view');
var MyRoundHolePage = require('./pages/my_round/hole');

module.exports = Router.extend({
  routes: {
    '': 'home',
    'me': 'me',
    'tournaments/new': 'new_tournament',
    'tournaments/:id/player/:id': 'tournament_player',
    'my-round': 'my_round',
    'my-round/:hole_id': 'my_round_hole',
    '(*path)': 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    var tournament = app.tournaments.first();
    this.trigger('newPage', new ViewTournamentPage({
      model: tournament
    }), true);
  },

  me: function () {
    this.trigger('newPage', new ProfilePage({
      model: me
    }));
  },

  new_tournament: function () {
    this.trigger('newPage', new EditTournamentPage({
      model: me
    }));
  },

  view_tournament: function(tournament) {
    this.trigger('newPage', new ViewTournamentPage({
      model: tournament
    }));
  },

  tournament_player: function(tournament_id, player_id) {
    var tee_time = app.tee_times.findByTournamentAndPlayer(tournament_id, player_id);
    this.trigger('newPage', new TournamentPlayerPage({
      model: tee_time
    }), app.scores.length == 0);
  },

  my_round: function() {
    var model;

    if(!me.is_logged_in){ return this.redirectTo(''); }
    if(me.identity_type == 'tee_time'){ model = app.tee_times.findByID(me.id) }

    this.trigger('newPage', new MyRoundPage({
      model: model
    }), true);
  },

  my_round_hole: function(hole_id) {
    var model;

    if(!me.is_logged_in){ return this.redirectTo(''); }
    if(me.identity_type == 'tee_time'){ model = app.tee_times.findByID(me.id) }

    this.trigger('newPage', new MyRoundHolePage({
      model: model,
      hole_id: hole_id
    }), app.scores.length == 0);
  },

  catchAll: function (slug) {
    var tournament = app.tournaments.findBySlug(slug);
    if(tournament){ return this.view_tournament(tournament) }
    this.redirectTo('');
  }
});