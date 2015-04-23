// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../../dist/templates');
var LoginPage = require('./login');

var LoggedInAsView = View.extend({
  template: templates.my_round.logged_in_as
});

var ScorecardHoleView = View.extend({
  template: templates.my_round.hole,
  initialize: function(options){
    this.hole = options.hole;
    this.tee_time = options.tee_time;
  },
  render: function(){
    var hole = this.hole;

    all_tee_times_in_group = this.tee_time.findAllTeeTimes();
    this.scores = _(all_tee_times_in_group).map(function(tee_time){
      return tee_time.score_on_hole(hole.id);
    });
    
    this.renderWithTemplate();
  }
});

var ScorecardHeaders = View.extend({
  template: templates.my_round.scorecard_header
});

var ScorecardView = View.extend({
  template: templates.my_round.scorecard,
  render: function(){
    this.renderWithTemplate();

    // var scorecard_header_view = new ScorecardHeaders({ model: me });
    // this.renderSubview(scorecard_header_view, '.my-scorecard');

    var course = this.model.course;
    course.holes.each(_.bind(this.renderHole, this));
  },

  renderHole: function(hole){
    var view = new ScorecardHoleView({ 
      hole: hole,
      tee_time: this.model
    });
    this.renderSubview(view, '.my-scorecard');
  }
});

module.exports = View.extend({
  template: templates.my_round.base,

  render: function() {
    this.renderWithTemplate();

    if(me.id){
      var scorecard_view = new ScorecardView({ model: me.tee_time });
      this.renderSubview(scorecard_view, '.page');

      var logged_in_as = new LoggedInAsView({ model: me.tee_time });
      this.renderSubview(logged_in_as, '.page');

    } else {
      var login_page = new LoginPage();
      this.renderSubview(login_page, '.page');
      login_page.once('login:success', this.render, this);
    }
  }
});