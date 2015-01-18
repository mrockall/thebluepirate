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
    this.page_container.addEventListener('swipeview-moveout', _.bind(this.setPageContainerHeight, this));
    this.setPageContainerHeight();

    setFavicon('/images/favicon.png');
    return this;
  },

  generatePage: function(i, page) {
    var el = page.querySelector('.page');
    el.innerHTML = "neglecting my other guests. enjoy yourself, you'll find the young ladies stimulating company. did you hear about the happy roman? he was glad he ate her. he hid it in the one place he knew he could hide something: his ass. five long years, he wore this watch up his ass. then, when he died of dysentery, he gave me the watch. you know why the yankees always win, frank? it's 'cause the other teams can't stop staring at those damn pinstripes. i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. this is america, babe, you gotta think big to be big. you know why the yankees always win, frank? it's 'cause the other teams can't stop staring at those damn pinstripes. selina! selina kyle, you're fired! and bruce wayne, why are you dressed up like batman? this is america, babe, you gotta think big to be big. did you hear about the happy roman? he was glad he ate her. i thought about you every time i jerked off, dickhead. I'm neglecting my other guests. enjoy yourself, you'll find the young ladies stimulating company. i got a fever, and the only prescription is more cowbell. i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. i got a fever, and the only prescription is more cowbell. he hid it in the one place he knew he could hide something: his ass. five long years, he wore this watch up his ass. then, when he died of dysentery, he gave me the watch. i thought about you every time i jerked off, dickhead. this is america, babe, you gotta think big to be big. you got the wrong guy, ace! you're talking to me all wrong... it's the wrong tone. you do it again and i'll stab you in the face with a soldering iron. hey, tell me, does your mother sew? boom. get her to sew that! you got the wrong guy, ace! you got the wrong guy, ace! you know why the yankees always win, frank? it's 'cause the other teams can't stop staring at those damn pinstripes. He hid it in the one place he knew he could hide something: his ass. five long years, he wore this watch up his ass. then, when he died of dysentery, he gave me the watch. you got the wrong guy, ace! two little mice fell in a bucket of cream. the first mouse quickly gave up and drowned. the second mouse, wouldn't quit. he struggled so hard that eventually he churned that cream into butter and crawled out. gentlemen, as of this moment, i am that second mouse. you're talking to me all wrong... it's the wrong tone. you do it again and i'll stab you in the face with a soldering iron. hey, tell me, does your mother sew? boom. get her to sew that! i got a fever, and the only prescription is more cowbell. what do you want me to say, that i'm sorry? that i apologize? well, people in hell want ice water, pal. you know why the yankees always win, frank? it's 'cause the other teams can't stop staring at those damn pinstripes. i thought about you every time i jerked off, dickhead. selina! selina kyle, you're fired! and bruce wayne, why are you dressed up like batman? did you hear about the happy roman? he was glad he ate her. two little mice fell in a bucket of cream. the first mouse quickly gave up and drowned. the second mouse, wouldn't quit. he struggled so hard that eventually he churned that cream into butter and crawled out. gentlemen, as of this moment, i am that second mouse. this is america, babe, you gotta think big to be big. I'm neglecting my other guests. enjoy yourself, you'll find the young ladies stimulating company. what do you want me to say, that i'm sorry? that i apologize? well, people in hell want ice water, pal. selina! selina kyle, you're fired! and bruce wayne, why are you dressed up like batman? what do you want me to say, that i'm sorry? that i apologize? well, people in hell want ice water, pal. you're talking to me all wrong... it's the wrong tone. you do it again and i'll stab you in the face with a soldering iron. hey, tell me, does your mother sew? boom. get her to sew that! i don't know what you want, but i know i can get it for you, with a minimum of fuss! money, jewels, a *very* big ball of string. what do you want me to say, that i'm sorry? that i apologize? well, people in hell want ice water, pal. two little mice fell in a bucket of cream. the first mouse quickly gave up and drowned. the second mouse, wouldn't quit. he struggled so hard that eventually he churned that cream into butter and crawled out. gentlemen, as of this moment, i am that second mouse. he hid it in the one place he knew he could hide something: his ass. five long years, he wore this watch up his ass. then, when he died of dysentery, he gave me the watch. i got a fever, and the only prescription is more cowbell. i'm neglecting my other guests. enjoy yourself, you'll find the young ladies stimulating company. i thought about you every time i jerked off, dickhead.";
  },

  // We need to set the outer height of the page container because the swipe library sets everything as height: 100%
  setPageContainerHeight: function() {
    var h = $(this.page_container).find('.swipeview-active .page').height();
    $(this.page_container).outerHeight(h);
  }
});