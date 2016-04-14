// ---- Vendor ----
var _ = require('underscore');
var setFavicon = require('favicon-setter');
var SwipeView = require('web-swipe-view').SwipeView;

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../dist/templates.js');

// ---- Pages ----
var TournamentHome = require('./home/view');
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
    app.on('refresh', this.refetchData, this);
    this.tournament = app.tournaments.first();
  },

  events: {
    'click a[href]': 'handleLinkClick',
    'mousedown .tabs a': 'tabClick'
  },

  render: function () {
    this.pages = {};
    this.renderWithTemplate();
    this.page_container = this.query('.page-container');
    this.$nav_links = $(this.el).find('.tabs a');

    this.swipe_view = new SwipeView(this.page_container, {
      numberOfPages: 2,
      generatePage: _.bind(this.buildPage, this),
    });

    this.swipe_view.onFlip(_.bind(this.pageChanged, this));

    // We need to update the height of the page container if we change the page..
    this.page_container.addEventListener('swipeview-flip', _.bind(this.setPageContainerHeight, this));
    this.setPageContainerHeight();
    app.on('updateHeight', this.setPageContainerHeight, this);

    this.setMinPagesHeight();

    setFavicon('/images/favicon.png');
    return this;
  },

  buildPage: function(i, page) {
    var el = page.querySelector('.page');
    var view;

    switch(i){
      // case 0:
      //   view = this.getOrCreatePage('home', TournamentHome);
      //   break;
      case 0:
        view = this.getOrCreatePage('leaderboard', TournamentLeaderboard);
        break;
      case 1:
        view = this.getOrCreatePage('my-round', MyRound);
        break;
    }

    $(el).html(view.el);
  },

  setPage: function(page_name) {
    switch(page_name){
      // case 'home':
      //   this.swipe_view.goToPage(0);
      //   break;
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

  getOrCreatePage: function(page_name, View) {
    // if(this.pages[page_name]){
    //   return this.pages[page_name];
    // }

    var view = this.pages[page_name] = new View({
      model: this.tournament
    });

    view.render();

    return view;
  },

  pageChanged: function(){
    var url = '';

    switch(this.swipe_view.pageIndex){
      // case 0:
      //   url = 'home';
      //   break;
      case 0:
        url = 'leaderboard';
        app.trigger('refresh');
        break;
      case 1:
        url = 'my-round';
        break;
    }

    app.router.history.navigate(url, {trigger: false});
    this.updateActiveNav();
  },

  refetchData: function(){
    if(this.pages['leaderboard']){
      this.pages['leaderboard'].refetchData();
    }
  },

  // We need to set the outer height of the page container because the swipe library sets everything as height: 100%
  setPageContainerHeight: function() {
    var current_page_height = $(this.page_container).find('.swipeview-active .page').outerHeight();
    var h = this.min_page_height > current_page_height ? this.min_page_height : current_page_height;
    $(this.page_container).outerHeight(h);
  },

  setMinPagesHeight: function(){
    var overall_height = $(this.el).outerHeight();
    var header_height = $(this.el).find('header').outerHeight();
    this.min_page_height = overall_height - header_height;
    $(this.el).find('.page-tabs').css('min-height', this.min_page_height);
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