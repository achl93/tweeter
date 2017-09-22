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
      tweets.find().sort({ created_at: 1 }).toArray(callback);
    },

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
      }
  };
}