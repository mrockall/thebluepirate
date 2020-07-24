var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'tournament',

  props: {
    id: ['integer'],
    course_id: ['integer'],
    name: ['string', true, ''],
    date: ['date'],
    slug: ['string']
  },

  derived: {
    course: {
      fn: function(){
        return app.courses.findByID(this.course_id);
      }
    },
    formatted_date: {
      deps: ['date'],
      fn: function() {
        return this.date.toLocaleDateString("en-US", { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
    }
  },

  url: function(){
    if(!this.id)
      return '/tournaments';

    return '/tournaments/' + this.id;
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