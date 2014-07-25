var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var CheckboxView = require('ampersand-checkbox-view');
var ArrayInputView = require('ampersand-array-input-view');


module.exports = FormView.extend({
  fields: function () {
    return [
      new InputView({
        label: 'Name',
        name: 'name',
        value: this.model && this.model.name,
        placeholder: 'Name',
        parent: this
      }),
      new CheckboxView({
        label: 'Is Awesome?',
        name: 'awesome',
        value: this.model && this.model.isAwesome,
        parent: this
      }),
      new InputView({
        label: 'Coolness Factor',
        name: 'coolnessFactor',
        value: this.model && this.model.coolnessFactor,
        placeholder: '8',
        parent: this,
        type: 'number',
        tests: [
          function (val) {
            if (val < 0 || val > 11) return "Must be between 0 and 11";
          },
          function (val) {
            if (!/^[0-9]+$/.test(val)) return "Must be a number.";
          }
        ]
      }),
      // new ArrayInputView({
      //   label: 'Favorite Colors',
      //   name: 'colors',
      //   value: this.model && this.model.colors,
      //   placeholder: 'blue',
      //   parent: this,
      //   numberRequired: 2,
      //   tests: [
      //     function (val) {
      //       if (['red', 'blue', 'green'].indexOf(val) === -1) {
      //         return "Can only be red, blue, or green. Sorry."
      //       }
      //     }
      //   ]
      // })
    ];
  }
});