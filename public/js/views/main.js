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

  initialize: function(){
    app.router.on('newPage', this.setPage, this);
  },

  events: {
    'click a[href]': 'handleLinkClick',
    'mousedown .tabs a': 'tabClick'
  },

  render: function () {
    this.renderWithTemplate();
    this.page_container = this.getByRole('page-container');
    this.$nav_links = $(this.el).find('.tabs a');

    this.swipe_view = new SwipeView(this.page_container, {
      numberOfPages: 2,
      generatePage: this.buildPage,
    });

    this.swipe_view.onFlip(_.bind(this.pageChanged, this));

    // We need to update the height of the page container if we change the page..
    this.page_container.addEventListener('swipeview-flip', _.bind(this.setPageContainerHeight, this));
    this.setPageContainerHeight();
    app.on('updateHeight', this.setPageContainerHeight, this);

    setFavicon('/images/favicon.png');
    return this;
  },

  buildPage: function(i, page) {
    var el = page.querySelector('.page');
    var tournament = app.tournaments.first();
    var view;

    switch(i){
      case 0:
        view = new TournamentLeaderboard({
          model: tournament
        });
        break;
      case 1:
        view = new MyRound();
        break;
    }

    view.render();
    $(el).html(view.el);
  },

  setPage: function(page_name) {
    switch(page_name){
      case 'leaderboard':
        this.swipe_view.goToPage(0);
        break;
      case 'my_round':
        this.swipe_view.goToPage(1);
        break;
      default:
        this.swipe_view.goToPage(0);
        break;
    }
  },

  pageChanged: function(){
    var url = '';

    switch(this.swipe_view.pageIndex){
      case 0:
        url = 'leaderboard';
        break;
      case 1:
        url = 'my-round';
        break;
    }

    app.router.history.navigate(url, {trigger: false});
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

  tabClick: function(ev) {
    $(ev.target).addClass('ripple').one(app.whichTransitionEvent, function() {
      $(this).removeClass('ripple');
    });
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