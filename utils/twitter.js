const { TwitterApi } = require('twitter-api-v2')
const { twitterApiKey } = require('./../config')

const twitterClient = new TwitterApi(twitterApiKey);

const getLikedTweets = async (authorId) => await twitterClient.v2.userLikedTweets(authorId, {
  expansions: ['author_id']
});
const createTweetUrl = (authorId, tweetId) => `https://twitter.com/${authorId}/status/${tweetId}`
const createLikedTweetsUrls = (likedTweets) => likedTweets.tweets.map(tweet => createTweetUrl(tweet.author_id, tweet.id))
const getTweetUrlsFromLikes = async (authorId) => {
  const likedTweets = await getLikedTweets(authorId)
  for(let i = 0; i < 10; i++) {
      await likedTweets.fetchNext()
  }
  return createLikedTweetsUrls(likedTweets)
}

exports.getTweetUrlsFromLikes = getTweetUrlsFromLikes