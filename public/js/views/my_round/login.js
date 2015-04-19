// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var Model = require('ampersand-model');
var templates = require('../../../dist/templates');

var LoginModel = Model.extend({
  props: {
    feeling: '',
    colour: '',
    animal: '',

    feeling_options: {
      type: 'array'
    }
  },

  initialize: function(){
    this.feeling_options = [
      'Angry', 'Delighted', 'Excited', 'Scared', 'Motivated',
      'Surprised', 'Confused', 'Happy', 'Anxious', 'Encouraged'
    ]
  }
});

var OptionsView = View.extend({
  template: templates.login.option,
  props: {
    label: ''
  },
  events: {
    'click .option': 'selectOption'
  },
  selectOption: function(ev){
    $(ev.delegateTarget).one(app.whichTransitionEvent, function() {
      $(this).removeClass('ripple');
    }).addClass('ripple');
  }
})

module.exports = View.extend({
  template: templates.my_round.login,

  initialize: function(){
    this.model = new LoginModel();
  },

  render: function(){
    this.renderWithTemplate();

    this.renderFeelingOptions();
  },

  renderFeelingOptions: function(){
    _(this.model.feeling_options).each(_.bind(function(item, i){
      var option_view = new OptionsView({
        label: item
      });

      this.renderSubview(option_view, '.options');
    }, this));
  }
});
