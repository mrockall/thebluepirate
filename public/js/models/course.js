var _ = require('underscore');
var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'course',
  props: {
    id: ['integer', true],
    name: ['string', true, '']
  },

  derived: {
    holes: {
      fn: function(){
        return app.holes.findAllByCourseID(this.id)
      }
    },
    front_nine: {
      fn: function(){
        return this.holes.slice(0,9);
      }
    },
    back_nine: {
      fn: function(){
        return this.holes.slice(9,18);
      }
    }
  },

  findHoleByID: function(hole_id) {
    return app.holes.findByCourseIDAndHoleID(this.id, hole_id)
  },

  front_nine_total_par: function(){
    return _(this.front_nine).reduce(function(total, hole){
      return total + hole.par;
    }, 0);
  }
});