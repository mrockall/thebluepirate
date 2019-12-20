/*global app, me, $*/
var $ = require('jquery');
var _ = require('underscore');
var BBEvents = require('backbone-events-standalone');

window.jQuery = window.$ = $;

// ---- Router ----
var Router = require('./router');

// ---- Models ----
var Me = require('./models/me');

// ---- Collections ----
var Tournaments = require('./collections/tournaments');
var TeeTimes = require('./collections/tee_times');
var Players = require('./collections/players');
var Courses = require('./collections/courses');
var Scores = require('./collections/scores');
var Holes = require('./collections/holes');

/** 
 * Adds CSRF support to Backbone
 */
var csrf_token = $("meta[name='csrf-token']").attr('content');

$.ajaxSetup({
  cache: false,
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader('X-CSRF-Token', csrf_token);
  }
});

/**
 * Helper to return the transition event
 */
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

// ---- Blast Off! ----
module.exports = _.extend({
  blastoff: function () {
    var self = window.app = this;

    app.whichTransitionEvent = whichTransitionEvent();

    window.me = new Me(InitialData.me);

    this.router = new Router();
    this.tournaments = new Tournaments();
    this.tee_times = new TeeTimes();
    this.players = new Players();
    this.courses = new Courses();
    this.scores = new Scores();
    this.holes = new Holes();

    self.tournaments.reset(InitialData.tournaments);
    self.tee_times.reset(InitialData.tee_times);
    self.players.reset(InitialData.players);
    self.courses.reset(InitialData.courses);
    self.holes.reset(InitialData.holes);
    self.scores.reset(InitialData.scores);

    $('document').ready(function () {
      self.setupBackboneNavigation();
      self.router.history.start({pushState: true, root: '/'});
    });
  },

  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;
    this.router.history.navigate(url, {trigger: true});
  },

  setupBackboneNavigation: function(){
    $(document).on('click', 'a:not([data-bypass])', function(evt) {
      // Get the anchor href and protcol
      var href = $(this).attr('href');
      var protocol = this.protocol + '//';

      // Ensure the protocol is not part of URL, meaning its relative.
      if (href && href.slice(0, protocol.length) !== protocol &&
          href.indexOf('javascript:') !== 0) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.preventDefault();
        evt.stopPropagation();

        // We don't use # alone in Ex Ordo, therefore just ignore any link
        // like that which might be triggered accidentaly by a plugin.
        if (href !== '#') {
          window.app.router.history.navigate(href, {trigger: true});
        }
      }
    });
  }
}, BBEvents);

// lets go!
module.exports.blastoff();