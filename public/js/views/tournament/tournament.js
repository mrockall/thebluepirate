var _           = require('underscore');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var Tournament  = require('../../models/tournament');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var TeeTime = View.extend({
  template: templates.tournament.tee_time,
});

module.exports = View.extend({
  template: templates.loading,

  initialize: function(options){
    this.tournament = new Tournament({
      id: options.id
    });
  },

  afterInsert: function(){
    this.tournament.fetch({
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
    this.renderWithTemplate(this, templates.tournament.tournament);
    this.tournament.tee_times.each(_.bind(this.renderTeeTime, this));
  },

  renderTeeTime: function(tee_time){
    var view = new TeeTime({
      model: tee_time
    });

    this.renderSubview(view, ".leaderboard");
  }
});
