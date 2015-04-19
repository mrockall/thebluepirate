// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../../dist/templates');


module.exports = View.extend({
  logged_in_template: templates.my_round.view,
  login_template: templates.my_round.login,

  render: function() {
    return this.renderWithTemplate(this, this.login_template);
  }
});