/*global app, me, $*/
var $ = require('jquery');
var _ = require('underscore');
var domReady = require('domready');

window.jQuery = window.$ = $;

// ---- Router ----
var Router = require('./router');

// ---- Models ----
var MainView = require('./views/main');
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
  beforeSend: function(xhr, settings){
    xhr.setRequestHeader('X-CSRF-Token', csrf_token);
  }
});

module.exports = {
  blastoff: function () {
    var self = window.app = this;

    window.me = new Me(InitialData.me);

    this.router = new Router();
    this.tournaments = new Tournaments();
    this.tee_times = new TeeTimes();
    this.players = new Players();
    this.courses = new Courses();
    this.scores = new Scores();
    this.holes = new Holes();

    $.get('/bootstrap')
     .done(function(data, status, xhr) {

      self.tournaments.reset(data.tournaments);
      self.tee_times.reset(data.tee_times);
      self.players.reset(data.players);
      self.courses.reset(data.courses);
      self.holes.reset(data.holes);
      self.players.reset(data.players);

      domReady(function () {
        var mainView = self.view = new MainView({
          model: me,
          el: document.body
        });
        mainView.render();

        self.router.on('newPage', mainView.setPage, mainView);
        self.router.history.start({pushState: true, root: '/'});
      });
    })
    .fail(function() {
      alert( "error" );
    });
  },

  is_mobile: function(){
    return $('body').width() <= 767;
  },

  // This is how you navigate around the app.
  // this gets called by a global click handler that handles
  // all the <a> tags in the app.
  // it expects a url without a leading slash.
  // for example: "costello/settings".
  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;
    this.router.history.navigate(url, {trigger: true});
  }
};

// lets go!
module.exports.blastoff();