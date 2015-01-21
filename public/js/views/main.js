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

/** === View
 * This main view is responsible for rendering all content that goes into
 * <html>. It's initted right away and renders iteslf on DOM ready.
 */
module.exports = View.extend({
  template: templates['body'],

  events: {
    'click a[href]': 'handleLinkClick'
  },

  render: function () {
    this.renderWithTemplate();
    this.page_container = this.getByRole('page-container');
    this.$nav_links = $(this.el).find('.tabs a');

    this.swipe_view = new SwipeView(this.page_container, {
      numberOfPages: 3,
      generatePage: this.buildPage,
    });

    // We need to update the height of the page container if we change the page..
    this.page_container.addEventListener('swipeview-flip', _.bind(this.setPageContainerHeight, this));
    this.setPageContainerHeight();

    setFavicon('/images/favicon.png');
    return this;
  },

  buildPage: function(i, page) {
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

  setPage: function(page_name) {
    switch(page_name){
      case 'leaderboard':
      case 'player_card':
        this.swipe_view.goToPage(1);
        break;
      default:
        this.swipe_view.goToPage(0);
        break;
    }

    this.updateActiveNav();
  },

  // We need to set the outer height of the page container because the swipe library sets everything as height: 100%
  setPageContainerHeight: function() {
    var h = $(this.page_container).find('.swipeview-active .page').outerHeight();
    $(this.page_container).outerHeight(h);
  },

  handleLinkClick: function (e) {
    var $t = $(e.target);
    var aEl = $t.is('a') ? $t[0] : $t.closest('a')[0];
    var local = window.location.host === aEl.host;
    var path = aEl.pathname.slice(1);

    // if the window location host and target host are the
    // same it's local, else, leave it alone
    if (local && !$t.data('bypass')) {
      e.preventDefault();
      app.navigate(path);
    }
  },

  updateActiveNav: function () {
    var pathname = window.location.pathname;
    this.$nav_links.each(function () {
      var navArray = _.compact($(this).attr('href').split('/')).join('/').toLowerCase();
      var pathArray = _.compact(pathname.split('/')).join('/').toLowerCase();

      if (pathArray === navArray) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }
});