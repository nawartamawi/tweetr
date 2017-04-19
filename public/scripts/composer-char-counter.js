$('document').ready( function (){
  let $text = $('.container .new-tweet textarea');
  $text.on('keyup', function () {
    let maxChar = 140;
    let tweet = $(this).val();
    let tweetLength = tweet.length;
    let counter = maxChar - tweetLength;
    if (counter < 0) {
      $(this).siblings('.counter').text(counter).addClass("red");
    }
    if (counter >= 0){
      $(this).siblings('.counter').text(counter).removeClass("red");
    }
  });
});
