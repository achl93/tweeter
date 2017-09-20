$(function() {
  let $button = $('#sendTweet');
  $button.click(function(event) {
    event.preventDefault();
    const tweet = $('form').serialize();
    console.log(tweet);
    $.ajax({
      url: $('form').attr('action'),
      method: 'POST',
      data: tweet
    })
  });
});