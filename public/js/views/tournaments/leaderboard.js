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
  props:{
    expanded: ['boolean', true, false]
  },
  events: {
    'click a': 'toggleScorecard'
  },
  render: function(){
    this.renderWithTemplate(this);
    this.cacheElements({
      scorecard: '.scorecard'
    });
    return this;
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

// ---- TournamentView ----
// Main Tournament View
// model -> Tournament
module.exports = View.extend({
  template: templates.tournaments.view,
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
  show_loading: function(){
    $(this.el).find(".list-loading").show();
  },
  hide_loading: function(){
    $(this.el).find(".list-loading").slideUp();
  }
});
