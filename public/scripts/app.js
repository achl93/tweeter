function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetObj) {
  return `
    <article class="tweet" data-liked="false" data-id="${tweetObj._id}">
      <header class="header">
        <img src="${escape(tweetObj.user.avatars.small)}" alt="avatar" class="avatar">
        <p class="name">${escape(tweetObj.user.name)}</p>
        <p class="handle">${escape(tweetObj.user.handle)}</p>
      </header>
      <p class="tweetContent">${escape(tweetObj.content.text)}</p>
      <footer class="footer">
        <p>${moment(tweetObj.created_at).fromNow()}</p>
        <a href="#" class="like"><i class="fa fa-heart actions">${tweetObj.likes}</i></a>
        <a href="#"><i class="fa fa-retweet actions"></i></a>
        <a href="#"><i class="fa fa-flag actions"></i></a>
      </footer>
    </article>
  `
}

function renderTweets(tweetsArray) {
  tweetsArray.forEach((tweetObj) => {
    let $tweet = createTweetElement(tweetObj);
    $(function() {
      $("#tweets").prepend($tweet);
    });
  })
}

function loadTweets() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    success: function(tweets) {
      renderTweets(tweets);
    }
  })
}

function loadNewTweet() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    success: function(tweets) {
      renderTweets([tweets[tweets.length - 1]]);
    }
  })
}

$(function() {
  loadTweets();
})

$(function() {
  $('#tweets').on('click', '.like', function(event){
    event.preventDefault();
    const $tweet = $(event.target).parents('article.tweet');
    const id = $tweet.data('id');

    if ($tweet.attr('data-liked') === 'false') {
      $.ajax({
        url: `/tweets/${id}/like`,
        method: "POST",
        data: { uniqueId: $('.tweet').data('id') },
        success: function(data) {
          $tweet.attr('data-liked', 'true');
          $(event.target).addClass('liked');
          $.ajax({
            url: `/tweets/${id}/like`,
            method: "GET",
            success: function(likes) {
              $(event.target).context.innerHTML = likes.likes;
            }
          })
        }
      })
    }
    else {
      $.ajax({
        url: `/tweets/${id}/like`,
        method: "DELETE",
        data: { uniqueId: $('.tweet').data('id') },
        success: function(data) {
          $tweet.attr('data-liked', 'false');
          $(event.target).removeClass('liked');
          $.ajax({
            url: `/tweets/${id}/like`,
            method: "GET",
            success: function(likes) {
              $(event.target).context.innerHTML = likes.likes;
            }
          })
        }
      })
    }
  })
});

$(function() {  
  const $button = $('#sendTweet');
  const $textarea = $('.new-tweet').find('textarea[name="text"]');
  $button.click(function(event) {
    if ($textarea.closest('form').children('.counter').text() < 0 || $('form') === "") {
      event.preventDefault();
      $(".new-tweet").append("<p style='color: red;'>Invalid Tweet</p>");
    }
    else {
      event.preventDefault();
      const tweet = $('form').serialize();
      $.ajax({
        url: $('form').attr('action'),
        method: 'POST',
        data: tweet,
        success: function(data) {
          loadNewTweet();
          $textarea.val('');
          $textarea.closest('form').children('.counter').text(140);
        }
      })
    }
  });
});

$(function() {
  const $textarea = $('.new-tweet').find('textarea[name="text"]');
  const $compose = $('#compose');
  $compose.click(function(event) {
    event.preventDefault();
    $('#composeAnchor').slideToggle("slow");
    $textarea.focus();
    const target = $(event.target);
    if (target.is('.unpressed')) {
      target.removeClass('unpressed');
      $('.new-tweet').addClass('closedForm');
    }
    else {
      target.addClass('unpressed');
      $('.new-tweet').removeClass('closedForm');
    };
  });
});