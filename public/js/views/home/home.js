var _           = require('underscore');
var $           = require('jquery');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var Tournaments = require('../../collections/tournaments');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Tournament = View.extend({
  template: templates.home.tournament,
});

module.exports = View.extend({
  template: templates.home.loading,

  initialize: function(){
    this.tournaments = new Tournaments();
  },

  afterInsert: function(){
    this.tournaments.fetch({
      success: _.bind(this.afterFetchSuccess, this)
    });
  },

  afterFetchSuccess: function(){
    this.renderWithTemplate(this, templates.home.home);
    this.tournaments.each(_.bind(this.renderTournament, this));
  },

  renderTournament: function(tournament){
    var view = new Tournament({
      model: tournament
    });

    this.renderSubview(view, ".events");
  }
});
