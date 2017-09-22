"use strict";

const { ObjectID } = require("mongodb");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  const tweets = db.collection('tweets');
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      tweets.insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      // tweets.find().toArray((err, tweets) => {
      //   if (err) {
      //     return callback(err);
      //   }
      //   callback(null, tweets.sort(sortNewestFirst));
      // });
      tweets.find().sort({ created_at: 1 }).toArray(callback);
    },

    // addLike: setLikes(1),
    // removeLike: setLikes(-1)

    addLike: function(tweetId, callback) {
      const mongoID = ObjectID(tweetId);
      tweets.updateOne(
        { "_id": mongoID },
        { $inc: { likes: 1 } }
      );
      callback(null, tweetId);
    },

    removeLike: function(tweetId, callback) {
      const mongoID = ObjectID(tweetId);
      tweets.updateOne(
        { "_id": mongoID },
        { $inc: { likes: -1 } }
      );
      callback(null, tweetId);
    },

    getLikes: function(tweetId, callback) {
      const mongoID = ObjectID(tweetId);
      const thisTweet = tweets.findOne( 
        { "_id": mongoID }, callback);
      // callback(null, thisTweet);
      }
  };

  // function setLikes(num) {
  //   function _setLikes(tweetId, callback) {
  //     const mongoID = ObjectID(tweetId);
  //     tweets.updateOne(
  //       { "_id": mongoID },
  //       { $inc: { likes: num } }
  //     );
  //     callback(null, tweetId);
  //   }
  // }
}