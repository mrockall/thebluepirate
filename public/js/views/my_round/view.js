// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../../dist/templates');
var LoginPage = require('./login');

/**
 * Scorecard Views
 *
 * The views required to render the logged in scorecard views
 * 
 */
var LoggedInAs = View.extend({
  template: templates.my_round.logged_in_as
});
var ScorecardHolePlayer = View.extend({
  template: templates.my_round.scorecard_hole_player,
  initialize: function(options){
    this.hole = options.hole;
    this.score = this.model.score_on_hole(this.hole.id);
  }
});
var ScorecardHole = View.extend({
  template: templates.my_round.hole,
  initialize: function(options){
    this.hole = options.hole;
    this.tee_time = options.tee_time;
  },
  props:{
    expanded: ['boolean', true, false]
  },
  events: {
    'click a': 'toggleScorecard'
  },
  render: function(){
    var hole = this.hole;

    this.group_tee_times = this.tee_time.findAllTeeTimes();
    this.scores = _(this.group_tee_times).map(function(tee_time){
      return tee_time.score_on_hole(hole.id);
    });

    this.renderWithTemplate();
    this.renderPlayers();

    this.cacheElements({
      scorecard: '.score-keeper'
    });
  },
  renderPlayers: function(){
    _(this.group_tee_times).map(_.bind(function(tee_time){
      var view = new ScorecardHolePlayer({ 
        model: tee_time,
        hole: this.hole
      });
      this.renderSubview(view, '.score-players');
    }, this));
  },
  toggleScorecard: function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    this._rippleEffect(ev);

    if(this.expanded){
      $(this.scorecard).velocity('slideUp', {
        complete: function(){
          app.trigger('updateHeight');
        }
      });
    } else {
      $(this.scorecard).velocity('slideDown', {
        complete: function(){
          app.trigger('updateHeight');
        }
      });
    }

    this.expanded = !this.expanded;
  },
  _rippleEffect: function(ev) {
    $(ev.delegateTarget).one(app.whichTransitionEvent, function() {
      $(this).removeClass('ripple');
    }).addClass('ripple');
  }
});
var ScorecardHeaders = View.extend({
  template: templates.my_round.scorecard_header
});
var Scorecard = View.extend({
  template: templates.my_round.scorecard,
  render: function(){
    this.renderWithTemplate();

    // var scorecard_header_view = new ScorecardHeaders({ model: me });
    // this.renderSubview(scorecard_header_view, '.my-scorecard');

    var course = this.model.course;
    course.holes.each(_.bind(this.renderHole, this));
  },

  renderHole: function(hole){
    var view = new ScorecardHole({ 
      hole: hole,
      tee_time: this.model
    });
    this.renderSubview(view, '.my-scorecard');
  }
});

/**
 * Main View Returned
 *
 * Renders either the Logged in screen or the Login screen..
 * 
 */
module.exports = View.extend({
  template: templates.my_round.base,

  render: function() {
    this.renderWithTemplate();

    if(me.id){
      var scorecard_view = new Scorecard({ model: me.tee_time });
      this.renderSubview(scorecard_view, '.page');

      var logged_in_as = new LoggedInAs({ model: me.tee_time });
      this.renderSubview(logged_in_as, '.page');

    } else {
      var login_page = new LoginPage();
      this.renderSubview(login_page, '.page');
      login_page.once('login:success', this.render, this);
    }
  }
});