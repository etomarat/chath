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
