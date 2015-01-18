/*global app, me, $*/

// This app view is responsible for rendering all content that goes into
// <html>. It's initted right away and renders iteslf on DOM ready.

// This view also handles all the 'document' level events such as keyboard shortcuts.

var _ = require('underscore');
var setFavicon = require('favicon-setter');
var SwipeView = require('web-swipe-view').SwipeView;
var View = require('ampersand-view');
var templates = require('../../dist/templates.js');

module.exports = View.extend({
  template: templates['body'],
  render: function () {
    this.renderWithTemplate();
    this.page_container = this.getByRole('page-container');

    this.swipe_view = new SwipeView(this.page_container, {
      numberOfPages: 3,
      generatePage: this.generatePage,
    });

    // We need to update the height of the page container if we change the page..
    this.page_container.addEventListener('swipeview-flip', _.bind(this.setPageContainerHeight, this));
    this.setPageContainerHeight();

    setFavicon('/images/favicon.png');
    return this;
  },

  generatePage: function(i, page) {
    var el = page.querySelector('.page');
    var l = Math.random() * (5 - 1) + 1, str = "";
    for (var i = 0; i < l; i++) {
       str += "neglecting my other guests. enjoy yourself, you'll find the young ladies stimulating company. did you hear about the happy roman? he was glad he ate her. he hid it in the one place he knew he could hide something: his ass. five long years, he wore this watch up his ass. then, when he died of dysentery, he gave me the watch. you know why the yankees always win, frank? it's 'cause the other teams can't stop staring at those damn pinstripes. i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. this is america, babe, you gotta think big to be big. you know why the yankees always win, frank? it's 'cause the other teams can't stop staring at those damn pinstripes. selina! selina kyle, you're fired! and bruce wayne, why are you dressed up like batman? this is america, babe, you gotta think big to be big. did you hear about the happy roman? he was glad he ate her. i thought about you every time i jerked off, dickhead. I'm neglecting my other guests. enjoy yourself, you'll find the young ladies stimulating company. i got a fever, and the only prescription is more cowbell. i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. i got a fever, and the only prescription is more cowbell. he hid it in the one place he knew he could hide something: his ass. five long years, he wore this watch up his ass. then, when he died of dysentery, he gave me the watch.";
    };
    el.innerHTML = str;
  },

  // We need to set the outer height of the page container because the swipe library sets everything as height: 100%
  setPageContainerHeight: function() {
    var h = $(this.page_container).find('.swipeview-active .page').height();
    $(this.page_container).outerHeight(h);
  }
});