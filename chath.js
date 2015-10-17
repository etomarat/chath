'use strict';
/* global TimeSync */

var Messages = new Mongo.Collection('log');

if (Meteor.isClient) {

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

  var sendAndClear = function(event) {
    var $input = $(event.target).find('.input');
    var text = $input.val();

    $input.val('');
    Messages.insert({
      text: text,
      glitchText: text.toUpperCase(),
      createdAt: new Date(TimeSync.serverTime(new Date()))
    });
  };

  Template.body.helpers({
    messages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    }
  });

  Template.body.events({
    'submit .prompt-form': function(e) {
      e.preventDefault();
      sendAndClear(e);
    },
    'keypress .prompt-form': function() {
        $("html, body").stop(true).animate({
          scrollTop: $(document).height()
        }, "slow");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
