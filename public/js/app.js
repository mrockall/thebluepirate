/*global app, me, $*/
var $ = require('jquery');
var _ = require('underscore');

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
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader('X-CSRF-Token', csrf_token);
  }
});

// ---- Blast Off! ----
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

    self.tournaments.reset(InitialData.tournaments);
    self.tee_times.reset(InitialData.tee_times);
    self.players.reset(InitialData.players);
    self.courses.reset(InitialData.courses);
    self.holes.reset(InitialData.holes);
    self.scores.reset(InitialData.scores);

    $('document').ready(function () {
      var mainView = self.view = new MainView({
        model: me,
        el: document.querySelector('.content')
      });
      mainView.render();

      self.router.on('newPage', mainView.setPage, mainView);
      self.router.history.start({pushState: true, root: '/'});
    });
  },

  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page;
    this.router.history.navigate(url, {trigger: true});
  }
};

// lets go!
module.exports.blastoff();