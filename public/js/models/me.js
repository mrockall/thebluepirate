var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
  type: 'user',
  props: {
    id: ['integer'],
    tournament_id: ['integer'],
    name: ['string', true, ''],
    image_url: ['string'],
  },
  derived: {
    is_logged_in: {
      deps: ['id'],
      fn: function() {
        return !!this.id;
      }
    },
    identity_type: {
      deps: ['tournament_id'],
      fn: function() {
        if(this.tournament_id){
          return 'tee_time';
        }
        return 'user';
      }
    }
  }
});