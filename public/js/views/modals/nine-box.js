// ---- Vendor ----
var _ = require('underscore');
var $ = require('jquery');
var velocity = require('velocity-animate');
var velocity_ui = require('velocity-animate/velocity.ui');

// ---- BP Modules ----
var View = require('ampersand-view');
var templates = require('../../dist/templates');

$.fn.randomize = function(selector){
  (selector ? this.find(selector) : this).parent().each(function(){
    $(this).children(selector).sort(function(){
      return Math.random() - 0.5;
    }).detach().appendTo(this);
  });

  return this;
};


// ---- View ----
module.exports = View.extend({
  template: templates.modals.nine_box,
  initialize: function(options) {
    $('.modals').append('<div></div>');
    this.el = $('.modals div')[0];
    this.modal_title = options.title;
    app.router.once('route', this.hide, this);
    return this.render();
  },
  events: {
    'click .box': 'box_clicked',
    'click .back': 'hide'
  },
  render: function () {
    this.renderWithTemplate({
      title: this.modal_title
    });
    this.$meta = $(this.el).find('.meta');
    return this;
  },
  show: function() {
    $('body, html').addClass('no-scroll');
    this.$boxes = $(this.el).find('.' + this.attribute + ' .box');

    var rows = 2;
    if(this.attribute == 'score') rows = 5;
    else if(this.attribute == 'putts') rows = 3;
    
    this.$boxes.height(Math.ceil($('.options').outerHeight()/rows) + 'px');

    this.$meta.velocity('transition.expandIn', {
      duration: 150
    });
    this.$boxes.velocity('transition.expandIn', {
      drag: true,
      stagger: 35,
      duration: 150
    });

    return this;
  },
  hide: function() {
    this.$meta.velocity('transition.expandOut', {
      duration: 150
    });
    this.$boxes.velocity('transition.expandOut', {
      stagger: 20,
      duration: 150,
      complete: _.bind(function(){
        app.router.off('route', this.hide, this);
        this.remove();
        $('body, html').removeClass('no-scroll');
      }, this)
    });
  },
  box_clicked: function(ev) {
    var $target = $(ev.target);
    if(!$target.hasClass('box')){
      $target = $target.parent();
    }
    this.trigger('option:selected', $target.data('value'));

    this.hide();
  }
});