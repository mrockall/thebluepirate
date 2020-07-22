var _           = require('underscore');
var $           = require('jquery');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var Tournaments = require('../../collections/tournaments');

// - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - -

module.exports = View.extend({
  template: templates.tournament.tournament
});
