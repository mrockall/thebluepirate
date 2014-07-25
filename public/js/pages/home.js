var _ = require('underscore');
var $ = require('jquery');
var View = require('ampersand-view');
var TournamentListItem = require('../views/tournaments/list_item');
var templates = require('../dist/templates');

module.exports = View.extend({
  pageTitle: 'home',
  template: templates.pages.home,

  render: function() {
    this.renderWithTemplate();

    this.views = [];
    app.tournaments.each(_.bind(this.add_tournament, this));
  },

  add_tournament: function(tournament) {
    view = new TournamentListItem({
      model: tournament
    }).render();

    $(this.el).append(view.el);
    this.views.push(view);
  }
});