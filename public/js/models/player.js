var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'course',
  props: {
    id: ['integer', true],
    name: ['string', true, ''],
    handicap: ['integer', true, 28]
  },

  holes: function(){
    return app.holes.findByID(this.id)
  }
});