var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'tournament',
  url: '/tournaments',
  props: {
    id: ['integer'],
    course_id: ['integer'],
    name: ['string', true, ''],
    date: ['date'],
    slug: ['string']
  },
  derived: {
    formatted_date: {
      deps: ['date'],
      fn: function() {
        return "26th July 2014";
      }
    }
  },

  course: function(){
    return app.courses.findByID(this.course_id);
  },

  holes: function(){
    return this.course().holes();
  },

  findHoleById: function(hole_id) {
    return this.course().findHoleByID(hole_id);
  },

  tee_times: function(){
    return app.tee_times.findByTournamentID(this.id);
  }
});