'use strict';
/* global TimeSync */

var Messages = new Mongo.Collection('log');

if (Meteor.isClient) {

  Template.body.helpers({
    messages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    }
  });

  Template.body.events({
    'submit .prompt-form': function(e) {
      e.preventDefault();

      var text = event.target.input.value;
      Messages.insert({
        text: text,
        createdAt: new Date(TimeSync.serverTime(new Date()))
      });

      event.target.input.value = "";
    }
  });

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  $(function() {
    var $input = $('.input');
    $input.focus();
    $('.container').on('click', function(e) {
      $input.focus();
    });

    $input.on('keyup', function(e) {
      $('.new-output').text($input.val());
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
