/*global app, me, $*/

// This main view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders iteslf on DOM ready.

// ---- Vendor ----
var _ = require('underscore');
var setFavicon = require('favicon-setter');
var SwipeView = require('web-swipe-view').SwipeView;

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../dist/templates.js');

// ---- Pages ----
var TournamentHome = require('./tournaments/home');
var TournamentLeaderboard = require('./tournaments/leaderboard');
var MyRound = require('./my_round/view');

// ---- Main View ----
module.exports = View.extend({
  template: templates['body'],
  render: function () {
    this.renderWithTemplate();
    this.page_container = this.getByRole('page-container');

    this.swipe_view = new SwipeView(this.page_container, {
      numberOfPages: 3,
      generatePage: this.generatePage,
    });

    // We need to update the height of the page container if we change the page..
    this.page_container.addEventListener('swipeview-flip', _.bind(this.setPageContainerHeight, this));
    this.setPageContainerHeight();

    setFavicon('/images/favicon.png');
    return this;
  },

  generatePage: function(i, page) {
    var el = page.querySelector('.page');
    var view;
    var tournament = app.tournaments.first();

    switch(i){
      case 0:
        view = new TournamentHome();
        break;
      case 1:
        view = new TournamentLeaderboard({
          model: tournament
        });
        break;
      case 2:
        view = new TournamentHome();
        break;
    }

    view.render();
    $(el).html(view.el);
  },

  // We need to set the outer height of the page container because the swipe library sets everything as height: 100%
  setPageContainerHeight: function() {
    var h = $(this.page_container).find('.swipeview-active .page').outerHeight();
    $(this.page_container).outerHeight(h);
  }
});