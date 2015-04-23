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
  },

  nth_string: function(){
    if(this.number == 1)
      return 'st';

    else if(this.number == 2)
      return 'nd';

    else if(this.number == 3)
      return 'rd';

    else
      return 'th';
  }
});