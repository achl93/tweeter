$(function() {
  let $button = $('#sendTweet');
  $button.click(function(event) {
    if ($('.new-tweet').find('textarea[name="text"]').closest('form').children('.counter').text() < 0 || $('form') === "") {
      console.log("Invalid");
      event.preventDefault();
      $(".new-tweet").append("<p style='color: red;'>Invalid Tweet</p>");
    }
    else {
      console.log("Valid");
      event.preventDefault();
      const tweet = $('form').serialize();
      $.ajax({
        url: $('form').attr('action'),
        method: 'POST',
        data: tweet
      })
    }
  })
});