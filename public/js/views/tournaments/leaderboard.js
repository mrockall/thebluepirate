// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');

// ---- BP Modules ----
var TeeTimes = require('../../collections/tee_times');
var View = require('ampersand-view');
var templates = require('../../../dist/templates');

// ---- PlayerListItem ----
// Leaderboard Item for every Player..
// model -> Player
var PlayerListItem = View.extend({
  template: templates.tournaments.player_list_item,
  bindings: {
    'model.pretty_through': '[role=pretty_through]',
    'model.pretty_score': '[role=pretty_score]',
    'model.points': '[role=points]',
    'model.through': '[role=through]'
  }
});

var PuttsLeaderboardItem = View.extend({
  template: templates.tournaments.putts_list_item
});

var FairwaysLeaderboardItem = View.extend({
  template: templates.tournaments.fairways_list_item
});

var GreensLeaderboardItem = View.extend({
  template: templates.tournaments.greens_list_item
});

// ---- TournamentView ----
// Main Tournament View
// model -> Tournament
module.exports = View.extend({
  template: templates.tournaments.view,
  initialize: function(){
    app.router.on('pageEvent', this.handlePageEvents, this);
  },
  serialize: function(){
    return {
      tournament_name: this.model.name,
      course_name: this.model.course.name,
      tournament_date: this.model.formatted_date
    };
  },
  render: function () {
    this.renderWithTemplate(this.serialize());
    this.$players = $(this.el).find('.players');

    this.tee_times = new TeeTimes(this.model.tee_times());

    this.tee_times.on('request', this.show_loading, this);
    this.tee_times.on('sync', this.hide_loading, this);
    this.tee_times.on('sort', this.renderLeaderboard, this);

    this.renderLeaderboard();
  },
  handlePageEvents: function(event_name) {

  },
  renderLeaderboard: function(){
    this.views = [];
    this.$players.empty();
    
    this.tee_times.each(_.bind(function(m){
      var view = new PlayerListItem({
        model: m
      }).render();

      this.$players.append(view.el);
      this.views.push(view);
    }, this));
  },
  transitionIn: function(cb){
    $(this.el).show();

    $(this.el).find('.players li').hide().velocity('transition.slideUpIn', {
      duration: 200,
      stagger: 60
    });
  },
  show_loading: function(){
    $(this.el).find(".list-loading").show();
  },
  hide_loading: function(){
    $(this.el).find(".list-loading").slideUp();
  }
});
