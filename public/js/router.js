/*global me, app*/
var _ = require('underscore');
var Router = require('ampersand-router');

var ViewTournamentPage = require('./views/tournaments/view');
var TournamentPlayerPage = require('./views/tournaments/player');
var MyRoundPage = require('./views/my_round/view');
var MyRoundHolePage = require('./views/my_round/hole');

module.exports = Router.extend({
  routes: {
    '': 'home',
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