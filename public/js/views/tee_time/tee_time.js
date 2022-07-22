var _           = require('underscore');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var TeeTime     = require('../../models/tee_time');
var Tournament  = require('../../models/tournament');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var RowTitles = View.extend({
  template: templates.tee_time.row_titles
});
var RowHole = View.extend({
  template: templates.tee_time.row_hole,

  initialize: function(options){
    this.score = options.tee_time.scores.findByHole(this.model.id);
  }
});
var RowFrontNineSummary = View.extend({
  template: templates.tee_time.row_front_nine_summary
});
var RowBackNineSummary = View.extend({
  template: templates.tee_time.row_back_nine_summary
});
var RowOverallSummary = View.extend({
  template: templates.tee_time.row_overall_summary
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
    this.front_nine = this.tournament.course.holes.frontNine();
    this.back_nine = this.tournament.course.holes.backNine();

    this.renderWithTemplate(this, templates.tee_time.tee_time);
    this.renderTitles();

    this.front_nine.each(_.bind(this.renderHole, this));
    this.renderFrontNineSummary();

    this.back_nine.each(_.bind(this.renderHole, this));
    this.renderBackNineSummary();
    this.renderOverallSummary();
  },

  renderTitles: function(){
    var view = new RowTitles();
    this.renderSubview(view, "ul.holes");
  },

  renderHole: function(hole){
    var view = new RowHole({
      model: hole,
      tee_time: this.tee_time
    });

    this.renderSubview(view, "ul.holes");
  },

  renderFrontNineSummary: function(){
    var view = new RowFrontNineSummary({
      model: this.tee_time
    });

    this.renderSubview(view, "ul.holes");
  },

  renderBackNineSummary: function(){
    var view = new RowBackNineSummary({
      model: this.tee_time
    });

    this.renderSubview(view, "ul.holes");
  },

  renderOverallSummary: function(){
    var view = new RowOverallSummary({
      model: this.tee_time
    });

    this.renderSubview(view, "ul.holes");
  }
});
