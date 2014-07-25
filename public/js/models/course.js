var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'course',
  props: {
    id: ['integer', true],
    name: ['string', true, '']
  },

  holes: function(){
    return app.holes.findAllByCourseID(this.id)
  },

  findHoleByID: function(hole_id) {
    return app.holes.findByCourseIDAndHoleID(this.id, hole_id)
  }
});