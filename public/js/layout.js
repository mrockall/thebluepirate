var _ = require('underscore');
var $ = require('jquery');
var View = require('ampersand-view');
var templates = require('../dist/templates');

// - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - -

module.exports = View.extend({
  template: templates.layout,

  initialize: function(){
    this.workspace = null;
  },

  render: function(){
    this.renderWithTemplate(this);
    this.cacheDOM();
  },

  cacheDOM: function(){
    this.$workspace_container = this.query('.workspace-container');
  },

  renderWorkspace: function(workspace){
    if(this.workspace)
      this.workspace.remove();

    this.$workspace_container.append(workspace.el);
    this.workspace = workspace;
  }
});
