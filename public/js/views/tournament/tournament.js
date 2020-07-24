var _           = require('underscore');
var $           = require('jquery');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var Tournament  = require('../../models/tournament');

// - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - -

module.exports = View.extend({
  template: templates.loading,

  initialize: function(options){
    this.tournament = new Tournament({
      id: options.id
    });
  },

  afterInsert: function(){
    this.tournament.fetch({
      success: _.bind(this.afterFetchSuccess, this)
    });
  },

  afterFetchSuccess: function(){
    this.renderWithTemplate(this, templates.tournament.tournament);
  }
});
