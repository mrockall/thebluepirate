var _ = require('underscore');
var View = require('ampersand-view');
var templates = require('../../dist/templates');

module.exports = View.extend({
  template: templates["tournaments"]["list_item"],
  render: function(){
    this.renderWithTemplate(this.model.toJSON());
    return this;
  }
});