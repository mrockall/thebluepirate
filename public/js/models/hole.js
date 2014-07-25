var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'hole',
  props: {
    id: ['integer', true],
    course_id: ['integer', true],
    number: ['integer', true],
    par: ['integer', true],
    index: ['integer', true],
    length: ['integer', true]
  }
});