var _ = require('underscore');
var $ = require('jquery');
var View = require('ampersand-view');
var templates = require('../../../dist/templates');

// - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - -

module.exports = View.extend({
  template: templates.card.card
});
