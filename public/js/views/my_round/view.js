// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../../dist/templates');
var LoginPage = require('./login');


module.exports = View.extend({
  template: templates.my_round.base,

  render: function() {
    this.renderWithTemplate();

    if(me.id){

    } else {
      var login_page = new LoginPage();
      this.renderSubview(login_page, '.page');
    }
  }
});