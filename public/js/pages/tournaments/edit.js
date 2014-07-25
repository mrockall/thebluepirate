var _ = require('underscore');
var $ = require('jquery');
var View = require('ampersand-view');
var TournamentForm = require('../../forms/tournament');
var templates = require('../../dist/templates');

module.exports = View.extend({
  template: templates.tournaments.edit,
  render: function () {
    this.renderWithTemplate();

    this.form = new TournamentForm({
      model: this.model,
      el: this.el.querySelector('[role=field-container]'),
      submitCallback: function (data) {
        // here you'll get clean data object with
        // keyed by field name with the `value` for
        // that field. So for the sample form the
        // data might look like this:
        // {
        //    name: "holly", 
        //    awesome: true, 
        //    coolnessFactor: 11,
        //    colors: ['red', 'green']
        // }
        console.log(data); 
      }
    });
  }
});