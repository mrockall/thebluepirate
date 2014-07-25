var Collection = require('ampersand-rest-collection');
var Holes = require('../models/hole');

module.exports = Collection.extend({
    model: Holes,
    url: '/holes',

    findByCourseIDAndHoleID: function(id, hole_id){
      return this.findWhere({
        course_id: id,
        id: parseInt(hole_id)
      });
    },

    findAllByCourseID: function(id){
      return this.where({course_id: id});
    }
});