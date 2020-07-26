var _           = require('underscore');
var View        = require('ampersand-view');
var templates   = require('../../../dist/templates');
var TeeTime     = require('../../models/tee_time');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = View.extend({
  template: templates.loading,

  initialize: function(options){
    this.tee_time = new TeeTime({
      id: options.id
    });
  },

  afterInsert: function(){
    this.tee_time.fetch({
      data: {
        expand: [
          'scores',
          'scores.player'
        ].join(',')
      },
      success: _.bind(this.afterFetchSuccess, this)
    });
  },

  afterFetchSuccess: function(){
    this.renderWithTemplate(this, templates.tee_time.tee_time);
  }
});
