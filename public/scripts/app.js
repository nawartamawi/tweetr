
function createTweetElement(tweetData) {
  var $tweet = $("<article>").addClass("tweet");
  var $header = $(`
  <header>
  <div><img class="avatar" src="${tweetData.user.avatars.small}"><img></div>
    <div class="name">${tweetData.user.name}</div>
    <div class="username">${tweetData.user.handle}</div>
  </header>
  `);
  var $tweetText = $("<div>").text(tweetData.content.text).addClass("tweet-text");
  var $footer = $(`<footer>
            <div class="time-stamp">${tweetData.created_at}</div>
            <div class="icons">icons</div>
          </footer>`);
  $tweet.append($header, $tweetText, $footer);
  return $tweet;
}

function renderTweets(tweets) {
  $('#container').empty();
  tweets.forEach((tweet) => {
    $('#container').prepend(createTweetElement(tweet));
  });

}
function loadTweets() {
  $.ajax({
    method: "GET",
    url: "/tweets"
  }).then((tweets)=> {
    renderTweets(tweets);
  });
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
$(document).ready(function() {
  $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();
    if(canPostValidator()){
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).then(function(){
        loadTweets();
      });
    }
  });
  $( "#nav-bar .compose" ).click(function() {
    $( ".new-tweet" ).slideToggle(()=>{
      $( ".new-tweet form" ).focus();
    });

  });
  loadTweets();
});
