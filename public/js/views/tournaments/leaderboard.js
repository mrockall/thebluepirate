// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');
var Model = require('ampersand-model');

// ---- BP Modules ----
var TeeTimes = require('../../collections/tee_times');
var View = require('ampersand-view');
var templates = require('../../../dist/templates');

var DataLayer = Model.extend({
  type: 'data_layer',
  url: 'tee_times'
})

// ---- PlayerListItem ----
// Leaderboard Item for every Player..
// model -> TeeTime
var PlayerListItem = View.extend({
  template: templates.tournaments.player_list_item,
  events: {
    'click a': 'toggleScorecard'
  },
  initialize: function(options){
    this.pos = options.position;
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

    if(this.model.expanded){
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

    this.model.expanded = !this.model.expanded;
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
    this.data_model = new DataLayer();

    this.renderWithTemplate(this.serialize());
    this.$players = $(this.el).find('.players');

    app.on('refresh', this.refetch_data, this);

    this.tee_times = new TeeTimes(this.model.tee_times());

    this.tee_times.on('request', this.show_loading, this);
    this.tee_times.on('sync', this.hide_loading, this);

    this.renderLeaderboard();
  },
  renderLeaderboard: function(){
    this.views = [];
    this.$players.empty();
    
    this.tee_times.each(_.bind(function(m, i){
      var view = new PlayerListItem({
        model: m,
        position: i + 1
      }).render();

      this.$players.append(view.el);
      this.views.push(view);
    }, this));
  },
  refetch_data: function(){
    this.data_model.fetch({
      success: _.bind(this.refetch_data_success, this)
    });
  },
  refetch_data_success: function(data_model, data){
    app.scores.set(data.scores);
    this.tee_times.set(data.tee_times);
    this.renderLeaderboard();
  },
  show_loading: function(){
    $(this.el).find(".list-loading").show();
  },
  hide_loading: function(){
    $(this.el).find(".list-loading").slideUp();
  }
});
