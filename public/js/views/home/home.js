var _           = require('underscore');
var $           = require('jquery');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var Tournaments = require('../../collections/tournaments');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TeeTime = View.extend({
  template: templates.home.tee_time
});

var Tournament = View.extend({
  template: templates.home.tournament,

  render: function(){
    this.renderWithTemplate();
    
    var tee_times = this.model.tee_times.first(3);
    tee_times.forEach(_.bind(this.renderTeeTime, this));
  },

  renderTeeTime: function(tee_time){
    var view = new TeeTime({
      model: tee_time
    });

    this.renderSubview(view, "ul");
  }
});

module.exports = View.extend({
  template: templates.loading,

  initialize: function(){
    this.tournaments = new Tournaments();
  },

  afterInsert: function(){
    this.tournaments.fetch({
      data: {
        expand: [
          'course',
          'tee_times',
          'tee_times.player'
        ].join(',')
      },
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
