var AmpersandModel = require('ampersand-model');
var TeeTimes       = require('../collections/tee_times');
var Course         = require('../models/course');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = AmpersandModel.extend({
  type: 'tournament',

  props: {
    id: ['integer'],
    course_id: ['integer'],
    name: ['string', true, ''],
    date: ['date'],
    slug: ['string']
  },

  collections: {
    tee_times: TeeTimes
  },

  children: {
    course: Course
  },

  derived: {
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
  }
});