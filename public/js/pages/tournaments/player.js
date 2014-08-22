var _ = require('underscore');
var $ = require('jquery');
var View = require('ampersand-view');
var templates = require('../../dist/templates');
var Scores = require('../../collections/scores');

var HoleListItem = View.extend({
  template: templates.tournaments.hole_list_item,
  initialize: function(options) {
    this.score = options.score;
  },
  bindings: {
    'score.pretty_score': '[role=score]',
    'score.pretty_points': '[role=points]'
  }
});

var TotalsView = View.extend({
  template: templates.tournaments.totals_list_item,
  initialize: function(options) {
    this.title = options.title;
    this.score_total = options.score_total;
    this.points_total = options.points_total;
  },
  serialize: function() {
    return {
      title: this.title,
      score_total: this.score_total,
      points_total: this.points_total
    }
  },
  render: function() {
    return this.renderWithTemplate(this.serialize());
  }
})

module.exports = View.extend({
  template: templates.tournaments.player,
  serialize: function() {
    var player = this.model.player();
    return {
      player_name: player.name,
      player_handicap: player.handicap
    }
  },
  render: function () {
    this.views = [];
    this.renderWithTemplate(this.serialize());
    this.$scorecard = $(this.el).find('.scorecard');

    this.show_loading();

    _(this.model.tournament().holes()).each(_.bind(this.add_player_view, this));

    this.render_totals();

    this.scores = new Scores(app.scores.findByTeeTime(this.model.id));
    this.scores.on('request', this.show_loading, this);
    this.scores.on('sync', this.hide_loading, this);
    this.scores.on('error', this.try_again, this);

    this.scores.url = '/scores/' + this.model.id;

    this.scores.fetch();
  },

  transitionIn: function(cb){
    $(this.el).show();

    $(this.el).find('.scorecard li').hide().velocity('transition.slideUpIn', {
      duration: 200,
      stagger: 100
    });
  },

  add_player_view: function(model, index){
    var score = app.scores.findByTeeTimeAndHole(this.model.id, model.id);

    var v = new HoleListItem({
      model: model,
      score: score
    }).render();

    this.views.push(v);
    this.$scorecard.append(v.el);
  },

  render_totals: function() {
    var t, view;

    t = this.model.get_totals('Front 9')
    view = new TotalsView({
      title: 'Front 9',
      score_total: t.strokes,
      points_total: t.points,
    }).render();

    this.$scorecard.children(":nth-child(9)").after(view.el)

    t = this.model.get_totals('Back 9')
    view = new TotalsView({
      title: 'Back 9',
      score_total: t.strokes,
      points_total: t.points
    }).render();

    this.$scorecard.append(view.el)

    t = this.model.get_totals('Total')
    view = new TotalsView({
      title: 'Total',
      score_total: t.strokes,
      points_total: t.points
    }).render();

    this.$scorecard.append(view.el)
  },

  show_loading: function(){
    $(this.el).find(".list-loading").show();
  },
  hide_loading: function(){
    $(this.el).find(".list-loading").slideUp();
  },
  try_again: function(){
    this.scores.fetch();
  }
});