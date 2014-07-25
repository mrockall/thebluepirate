// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../dist/templates');

// ---- PlayerListItem ----
// Leaderboard Item for every Player..
// model -> Player
var PlayerListItem = View.extend({
  template: templates.tournaments.player_list_item,
  serialize: function(){
    var player = this.model.player();
    return {
      position: this.model.through > 0 ? this.model.position : "-",
      player_url: this.model.player_url,
      player_name: player.name,
      holes_through: this.model.through,
      points_scored: this.model.points > 0 ? this.model.points : "",
      time: this.model.time_parsed
    }
  },
  render: function() {
    this.renderWithTemplate(this.serialize());
    if(this.model.through == 0) $(this.el).addClass('pre'); 
    return this;
  }
});

// ---- TournamentView ----
// Main Tournament View
// model -> Tournament
module.exports = View.extend({
  template: templates.tournaments.view,
  serialize: function(){
    var course = this.model.course();
    return {
      tournament_name: this.model.name,
      course_name: course.name,
      tournament_date: this.model.formatted_date
    };
  },
  render: function () {
    this.views = [];
    this.renderWithTemplate(this.serialize());
    this.$leaderboard = $(this.el).find('.leaderboard');

    _(this.model.tee_times()).each(_.bind(this.add_player_view, this));
  },
  add_player_view: function(model){
    var v = new PlayerListItem({
      model: model
    }).render();

    this.views.push(v);
    this.$leaderboard.append(v.el);
  }
});