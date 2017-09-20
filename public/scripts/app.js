// Fake data taken from tweets.json
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetObj) {
  return `
    <article class="tweet">
      <header class="header">
        <img src="${escape(tweetObj.user.avatars.small)}" alt="avatar" class="avatar">
        <p class="name">${escape(tweetObj.user.name)}</p>
        <p class="handle">${escape(tweetObj.user.handle)}</p>
      </header>
      <p class="tweetContent">${escape(tweetObj.content.text)}</p>
      <footer class="footer">
        <p>${escape(tweetObj.created_at)} days ago</p>
        <a href=""><i class="fa fa-heart actions"></i></a>
        <a href=""><i class="fa fa-retweet actions"></i></a>
        <a href=""><i class="fa fa-flag actions"></i></a>
      </footer>
    </article>
  `
}

function renderTweets(tweetsArray) {
  tweetsArray.forEach((tweetObj) => {
    let $tweet = createTweetElement(tweetObj);
    $(function() {
      $("#tweets").append($tweet);
    });
  })
}

$(function() {
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(tweets) {
        renderTweets(tweets);
      }
    })
  }
  loadTweets();
});

// renderTweets(data);