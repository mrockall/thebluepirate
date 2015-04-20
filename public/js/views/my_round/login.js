// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var BPModel = require('../../models/bp_modal');
var templates = require('../../../dist/templates');

var LoginModel = BPModel.extend({
  url: 'sessions/',

  props: {
    feeling: '',
    colour: '',
    animal: ''
  },

  session: {
    feeling_options: {type: 'array'},
    colour_options: {type: 'array'},
    animal_options: {type: 'array'}
  },

  initialize: function(){
    this.feeling_options = [
      'Angry', 'Delighted', 'Excited', 'Scared', 'Motivated',
      'Surprised', 'Confused', 'Happy', 'Anxious', 'Encouraged'
    ];

    this.colour_options = [
      'Blue', 'Red', 'Yellow', 'Green', 'Purple',
      'Pink', 'Brown', 'Black', 'Orange', 'Indigo'
    ];

    this.animal_options = [
      'Lion', 'Dog', 'Rhino', 'Horse', 'Snake',
      'Cat', 'Giraffe', 'Tiger', 'Pig', 'Duck'
    ];
  },

  startOver: function(){
    this.feeling = '';
    this.colour = '';
    this.animal = '';
  },

  tryLogin: function(){
    this.save();
    // this.trigger('login:success');
    this.trigger('login:failed');
  }
});

var OptionsView = View.extend({
  template: templates.login.option,
  props: {
    label: '',
    extra_classes: ''
  },
  events: {
    'click .option': 'selectOption'
  },
  selectOption: function(ev){
    var $el = $(ev.delegateTarget);
    $el.one(app.whichTransitionEvent, _.bind(function() {
      $el.removeClass('ripple');
      this.trigger('option:clicked', this.label);
    }, this)).addClass('ripple');
  }
});

var LoadingView = View.extend({
  template: templates.login.loading
});

var ErrorView = View.extend({
  template: templates.login.error
});

module.exports = View.extend({
  template: templates.login.base,

  initialize: function(){
    this.model = new LoginModel();
  },

  render: function(){
    this.renderWithTemplate();
    this.renderFeelingOptions();
  },

  renderFeelingOptions: function(){
    _(this.model.feeling_options).each(_.bind(function(item, i){
      var view = new OptionsView({
        label: item
      });

      this.listenTo(view, 'option:clicked', this.feelingOptionClicked);

      this.renderSubview(view, '.options');
    }, this));
  },

  feelingOptionClicked: function(feeling_clicked){
    this.model.feeling = feeling_clicked;

    _(this._subviews).each(_.bind(function(view){
      this.stopListening(view);
      view.remove();
    }, this));

    this.renderColourOptions();
  },

  renderColourOptions: function(feeling_clicked){
    _(this.model.colour_options).each(_.bind(function(item, i){
      var view = new OptionsView({
        label: item
      });

      this.listenTo(view, 'option:clicked', this.colourOptionClicked);

      this.renderSubview(view, '.options');
    }, this));

    this.renderStartOverView();
  },

  colourOptionClicked: function(colour_clicked){
    this.model.colour = colour_clicked;

    _(this._subviews).each(_.bind(function(view){
      this.stopListening(view);
      view.remove();
    }, this));

    this.renderAnimalOptions();
  },

  renderAnimalOptions: function(feeling_clicked){
    _(this.model.animal_options).each(_.bind(function(item, i){
      var view = new OptionsView({
        label: item
      });

      this.listenTo(view, 'option:clicked', this.tryLogin);

      this.renderSubview(view, '.options');
    }, this));

    this.renderStartOverView();
  },

  tryLogin: function(animal_clicked){
    this.model.animal = animal_clicked;

    _(this._subviews).each(_.bind(function(view){
      this.stopListening(view);
      view.remove();
    }, this));

    var view = new LoadingView();
    this.renderSubview(view, '.options');

    this.listenTo(this.model, 'login:failed', this.loginFailed)
    this.model.tryLogin();
  },

  loginFailed: function(){
    this.startOver();

    var view = new ErrorView();
    this.renderSubview(view, '.errors');
  },

  renderStartOverView: function(){
    var view = new OptionsView({
      label: 'Start Over',
      extra_classes: 'full_width'
    });
    this.renderSubview(view, '.options');

    this.listenTo(view, 'option:clicked', this.startOver);
  },

  startOver: function(){
    _(this._subviews).each(_.bind(function(view){
      this.stopListening(view);
      view.remove();
    }, this));

    this.model.startOver();
    this.renderFeelingOptions();
  }
});
