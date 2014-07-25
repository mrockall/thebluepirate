// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../dist/templates');

var HoleListItem = View.extend({
  template: templates.my_round.hole_card,
  serialize: function(){
    return {
      id: this.model.id,
      number: this.model.number,
      par: this.model.par,
      length: this.model.length
    };
  },
  render: function () {
    return this.renderWithTemplate(this.serialize());
  }
});

var LeaderboardItem = View.extend({
  template: templates.tournaments.player_list_item,
  serialize: function(){
    var player = this.model.player();
    return {
      position: this.model.through > 0 ? this.model.position : "-",
      player_url: this.model.player_url,
      player_name: player.name,
      holes_through: this.model.through,
      points_scored: this.model.points
    }
  },
  render: function() {
    return this.renderWithTemplate(this.serialize());
  }
});

module.exports = View.extend({
  template: templates.my_round.view,
  serialize: function(){
    var tournament = this.model.tournament();
    return {
      tournament_name: tournament.name
    };
  },
  render: function () {
    this.views = [];
    this.renderWithTemplate(this.serialize());
    this.$course_tiles = $(this.el).find('.course_tiles');
    this.$leaderboard = $(this.el).find('.leaderboard');

    _(this.model.tournament().holes()).each(_.bind(this.add_hole_tile, this));

    this.render_tee_time_players();
  },

  add_hole_tile: function(model, index){
    var v = new HoleListItem({
      model: model
    }).render();

    this.views.push(v);
    this.$course_tiles.append(v.el);
  },

  render_tee_time_players: function() {
    var tee_times = this.model.findAllTeeTimes();
    _(tee_times).each(_.bind(this.add_player, this));
  },

  add_player: function(model, index) {
    var v = new LeaderboardItem({
      model: model
    }).render();

    this.views.push(v);
    this.$leaderboard.append(v.el);
  }
});