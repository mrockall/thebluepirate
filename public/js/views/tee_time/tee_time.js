var _           = require('underscore');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var TeeTime     = require('../../models/tee_time');
var Tournament  = require('../../models/tournament');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Hole = View.extend({
  template: templates.tee_time.hole,

  initialize: function(options){
    this.score = options.tee_time.scores.findByHole(this.model.id);
  }
});

module.exports = View.extend({
  template: templates.loading,

  initialize: function(options){
    this.tee_time = new TeeTime({
      id: options.id
    });

    this.tournament = new Tournament();
  },

  afterInsert: function(){
    this.tee_time.fetch({
      data: {
        expand: [
          'scores',
          'player'
        ].join(',')
      },
      success: _.bind(this.afterTeeTimeFetch, this)
    });
  },

  afterTeeTimeFetch: function(){
    this.tournament.id = this.tee_time.tournament_id;

    this.tournament.fetch({
      data: {
        expand: [
          'course',
          'course.holes'
        ].join(',')
      },
      success: _.bind(this.afterFetchSuccess, this)
    });
  },

  afterFetchSuccess: function(){
    this.renderWithTemplate(this, templates.tee_time.tee_time);
    this.tournament.course.holes.each(_.bind(this.renderHole, this));
  },

  renderHole: function(hole){
    var view = new Hole({
      model: hole,
      tee_time: this.tee_time
    });

    this.renderSubview(view, "ul.holes");
  }
});
