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
    this.player = options.player;
  },
  events: {
    'click .minus': 'downScore',
    'click .plus': 'upScore'
  },
  bindings: {
    'model.pretty_score': {
      type: 'text',
      hook: 'pretty_score'
    }
  },
  downScore: function(){
    this.model.score = this.model.score - 1 > 0 ? this.model.score - 1 : null
  },
  upScore: function(){
    this.model.score = this.model.score + 1 <= 10 ? this.model.score + 1 : 10
  },
});
var ScorecardHoleSummary = View.extend({
  template: templates.my_round.hole_summary,
  initialize: function(options){
    this.hole = options.hole;
    this.tee_time = options.tee_time;
  },
  render: function(){
    var hole = this.hole;

    this.group_tee_times = this.tee_time.findAllTeeTimes();
    this.scores = _(this.group_tee_times).map(function(tee_time){
      return tee_time.score_on_hole(hole.id);
    });

    this.renderWithTemplate();
  }
})
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
    'click .hole': 'toggleScorecard',
    'click a.save': 'saveScores'
  },
  render: function(){
    this.renderWithTemplate();

    this.summary_view = new ScorecardHoleSummary({
      hole: this.hole,
      tee_time: this.tee_time
    });
    this.renderSubview(this.summary_view, '.hole');

    this.group_tee_times = this.tee_time.findAllTeeTimes();
    this.renderPlayers();

    this.cacheElements({
      scorecard: '.score-keeper',
      save_button: '.save'
    });
  },
  renderHoleScores: function(){
    this.summary_view.render();
  },
  renderPlayers: function(){
    _(this.group_tee_times).map(_.bind(function(tee_time){
      var score = tee_time.score_on_hole(this.hole.id);
      var view = new ScorecardHolePlayer({ 
        model: score,
        hole: this.hole,
        player: tee_time.player
      });
      this.renderSubview(view, '.score-players');
    }, this));
  },
  toggleScorecard: function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    this._rippleEffect(ev);

    this.expanded ? this._slideScorecardUp() : this._slideScorecardDown();
  },
  saveScores: function(ev){
    ev.preventDefault();
    ev.stopPropagation();

    $(this.save_button).addClass('is-loading');

    var hole = this.hole;
    var data = _(this.group_tee_times).map(function(tee_time){
      var score = tee_time.score_on_hole(hole.id);

      if(score){
        return score.getAttributes({props: true}, true);
      } else {
        console.log(tee_time, hole, score);
      }
    });

    $.ajax({
      type: "POST",
      url: "/scores/multi",
      dataType: "json",
      data: JSON.stringify(data),
      success: _.bind(function(data){
        $(this.save_button).removeClass('is-loading');
        app.scores.set(data, {remove: false});
        this._slideScorecardUp();
        this.renderHoleScores();
      }, this)
    });
  },
  _slideScorecardUp: function(){
    $(this.scorecard).velocity('slideUp', {
      complete: _.bind(function(){
        app.trigger('updateHeight');
        this.expanded = false;
      }, this)
    });
  },
  _slideScorecardDown: function(){
    $(this.scorecard).velocity('slideDown', {
      complete: _.bind(function(){
        app.trigger('updateHeight');
        this.expanded = true;
      }, this)
    });
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

    return this;
  }
});