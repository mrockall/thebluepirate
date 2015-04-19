// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var Model = require('ampersand-model');
var templates = require('../../../dist/templates');

var LoginModel = Model.extend({

});

module.exports = View.extend({
  template: templates.my_round.login,

  render: function(){
    console.trace();
    return this.renderWithTemplate();
  }
});