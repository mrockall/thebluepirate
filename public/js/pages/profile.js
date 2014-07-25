var View = require('ampersand-view');
var templates = require('../dist/templates');

module.exports = View.extend({
    pageTitle: 'profile',
    template: templates.pages.profile
});