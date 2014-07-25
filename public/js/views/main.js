/*global app, me, $*/

// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders iteslf on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.

var _ = require('underscore');
var setFavicon = require('favicon-setter');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');

var svgIcon = require('../helpers/svg-icons');
var SVGIconConfig = require('../helpers/svg-icons-config');

var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var templates = require('../dist/templates.js');

module.exports = View.extend({

  template: templates['body'],

  initialize: function () {
    app.router.history.on('route', this.updateActiveNav, this);
  },

  events: {
    'click a[href]': 'handleLinkClick'
  },

  serialize: function() {
    return _.extend(me.toJSON(), {
      is_logged_in: me.is_logged_in,
      identity_type: me.identity_type
    })
  },

  render: function () {
    this.renderWithTemplate(this.serialize());

    // Init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(this.getByRole('page-container'), {
      waitForRemove: true,
      hide: function (oldView, newView, cb) {
        $(oldView.el).velocity('transition.slideUpOut', {
          duration: 150,
          complete: function(){
            cb();
          }
        });
      },
      show: function (newView, oldView) {
        // it's inserted and rendered for me
        document.title = _.result(newView.pageTitle) || "Blue Pirate";
        document.scrollTop = 0;

        // store an additional reference, just because
        app.currentPage = newView;

        $(newView.el).velocity('transition.slideUpIn', {
          duration: 150,
          complete: function(){
            if(_.isFunction(newView.animate_in)){
              newView.animate_in();
            }
          }
        });
      }
    });

    this.hamburger_icon = new svgIcon( 
      document.querySelector('.hamburger-icon'), 
      SVGIconConfig['hamburgerCross'], 
      { 
        easing : mina.elastic, 
        size : { w : 36, h : 36 },
        speed: 600,
        onToggle: _.bind(function(){
          this.toggleMenu();
        }, this)
      }
    );

    setFavicon('/images/favicon.png');
    return this;
  },

  setPage: function (view) {
    // tell the view switcher to render the new one
    this.pageSwitcher.set(view);

    // mark the correct nav item selected
    this.updateActiveNav();
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
      this.hideMenu();
      app.navigate(path);
    }
  },

  updateActiveNav: function () {
    var pathname = window.location.pathname;
    $('.nav a').each(function () {
      var navArray = _.compact($(this).attr('href').split('/')).join('/').toLowerCase();
      var pathArray = _.compact(pathname.split('/')).join('/').toLowerCase();

      if (pathArray === navArray) {
        $(this).parent().addClass('active');
      } else {
        $(this).parent().removeClass('active');
      }
    });
  },

  toggleMenu: function() {
    var $nav = $(this.el).find('.nav');

    if($nav.is(":visible")){
      $nav.slideUp();
    } else {
      $nav.slideDown();
    }
  },

  hideMenu: function() {
    var $nav = $(this.el).find('.nav');

    if(app.is_mobile() && $nav.is(":visible")){
      this.hamburger_icon.toggle();
      $nav.slideUp();
    }
  }
});