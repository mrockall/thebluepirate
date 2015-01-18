// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../../dist/templates');

module.exports = View.extend({
  template: templates.tournaments.home,
});