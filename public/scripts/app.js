$(function() {
  "use strict";

  const tweetTemplate = $('#tweet-template').text();
  Handlebars.registerHelper('time_ago', function(timestamp) {
    return moment(timestamp).fromNow();
  });
  const template = Handlebars.compile(tweetTemplate);
  function handleError(error) {
    console.error(error);
  }
//prepare the new array of tweet (by using map) and then append it at once to the DOM
  function renderTweets(tweets) {
    $('#container').empty().append(tweets.map((tweet) => template(tweet) ).reverse());
  }

  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    }).then(renderTweets, handleError);
  }

  function canPostValidator() {
    const $text = $('[data-max-length]').val();
    const $textLength = $text.length;
    if ($textLength > 140) {
      alert("Tweet is too long");
      return false;
    } else if ($textLength === 0) {
      alert("Tweet cannot be empty");
      return false;
    } else {
      return true;
    }

  }
  // to see what it looks like

  const $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();
    if(canPostValidator()){
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).then(loadTweets, handleError);
    
    }
    
    $('textarea[name="text"]').val("");
  });
  $( "#nav-bar .compose" ).click(function() {
    $( ".new-tweet" ).slideToggle(function(){
      $('textarea[name="text"]').focus();
    });

  });
  loadTweets();
});
