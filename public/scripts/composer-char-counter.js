$(function() {
  $('.new-tweet').find('textarea[name="text"]').on('keyup keydown blur change', function() {
    $(this).closest('form').children('.counter').text(140 - $(this).val().length);
    if ($(this).closest('form').children('.counter').text() < 0) {
      $(this).closest('form').children('.counter').addClass("overCharLimit");
    }
    else {
      $(this).closest('form').children('.counter').removeClass("overCharLimit");
    }
  });
});