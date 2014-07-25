// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');

// ---- BP Modules ----
var TeeTimes = require('../../collections/tee_times');
var View = require('ampersand-view');
var templates = require('../../dist/templates');

// ---- PlayerListItem ----
// Leaderboard Item for every Player..
// model -> Player
var PlayerListItem = View.extend({
  template: templates.tournaments.player_list_item,
  render: function() {
    this.renderWithTemplate();
    if(this.model.through == 0) $(this.el).addClass('pre'); 
    return this;
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
  serialize: function(){
    var course = this.model.course();
    return {
      tournament_name: this.model.name,
      course_name: course.name,
      tournament_date: this.model.formatted_date
    };
  },
  render: function () {
    this.renderWithTemplate(this.serialize());

    this.renderCollection(
      new TeeTimes(this.model.tee_times()), 
      PlayerListItem, 
      '.players'
    );

    this.renderCollection(
      new TeeTimes(this.model.tee_times()).sortByPutts(), 
      PuttsLeaderboardItem, 
      '.putts'
    );

    this.renderCollection(
      new TeeTimes(this.model.tee_times()).sortByFairways(), 
      FairwaysLeaderboardItem, 
      '.fairways'
    );

    this.renderCollection(
      new TeeTimes(this.model.tee_times()).sortByGreens(), 
      GreensLeaderboardItem, 
      '.greens'
    );
  }
});