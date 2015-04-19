var AmpersandModel = require('ampersand-model');
var csrf_token = $("meta[name='csrf-token']").attr('content');

module.exports = AmpersandModel.extend({
  ajaxConfig: function(){
    return { 
      headers: {
        'X-CSRF-Token': csrf_token 
      }
    };
  }
});