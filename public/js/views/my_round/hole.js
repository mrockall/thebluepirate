// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var Collection = require('ampersand-collection');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../../dist/templates');
var NineBoxModal = require('../../views/modals/nine-box');

var PlayerView = View.extend({
  template: templates.my_round.hole_player,
  initialize: function (options) {
    this.hole = options.hole;
  },
  bindings: {
    'score.pretty_score': '[role=pretty_score]',
    'score.points': '[role=points]',
    // 'score.pretty_fairway': '[role=pretty_fairway]'
  },
  events: {
    'click .course_tiles li' : 'show_modal_overlay'
  },
  serialize: function(){
    this.player = this.model.player();
    this.score = app.scores.findByTeeTimeAndHole(this.model.id, this.hole.id);
    return {
      player_name: this.player.name,
      putts: this.score.pretty_putts,
      fairway: this.score.pretty_fairway,
      fairway_label: this.hole.par == 3 ? "Green" : "Fairway"
    }
  },
  render: function() {
    this.renderWithTemplate(this.serialize());
    this.score.on("all", function (eventName){
      if (eventName.slice(0, 7) === 'change:') {
        this._applyBindingsForKey("score");
      }
    }, this);
    return this;
  },
  show_modal_overlay: function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    this.modal = new NineBoxModal({
      title: $(ev.target).parents('li').data('title')
    });
    this.modal.once('option:selected', this.option_selected, this);
    this.modal.attribute = $(ev.target).parents('li').data('attr');
    this.modal.show();
  },
  option_selected: function(value) {
    this.score.save(this.modal.attribute, value);
  }
});

// ---- View ----
module.exports = View.extend({
  template: templates.my_round.hole,
  initialize: function(options) {
    this.views = [];
    this.hole_id = options.hole_id;
  },
  serialize: function(){
    return {
      hole_number: this.hole.number,
      hole_par: this.hole.par,
      hole_length: this.hole.length,
      hole_index: this.hole.index,
      prev_hole: this.hole.number > 1 ? this.hole.number - 1 : false,
      next_hole: this.hole.number < 18 ? this.hole.number + 1 : false,
      prev_hole_id: this.hole.id - 1,
      next_hole_id: this.hole.id + 1
    };
  },
  render: function () {
    this.hole = this.model.tournament().findHoleById(this.hole_id);

    this.renderWithTemplate(this.serialize());

    var tee_times = this.model.findAllTeeTimes();
    tee_times = tee_times.sort(function(a,b){return a.id > b.id;});
    this.renderCollection(
      new Collection(tee_times), 
      PlayerView, 
      '.players',
      {viewOptions: {hole: this.hole}}
    );
  }
});