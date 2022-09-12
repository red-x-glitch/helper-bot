const { TwitterApi } = require('twitter-api-v2')
const { twitterApiKey } = require('./../config.json')
const { pipe, andThen, otherwise } = require('ramda')

const twitterClient = new TwitterApi(twitterApiKey);

const tweetUrl = url => new URL(url)

const getTweetId = tweetUrl => {
  const urlPaths = tweetUrl.pathname.split("/")
  return urlPaths.includes('status') && urlPaths.slice(-1)[0]
}

const getTweetObject = async (tweetUrl) => await twitterClient.v2.tweets(getTweetId(tweetUrl), {
  expansions: ['attachments.media_keys'],
  'media.fields': ['url'],
})
const pullImageFromTweetObj = tweetObject => tweetObject.includes?.media.map(data => data?.url)
const pullTextFromTweetObj = tweetObject => tweetObject?.data[0]?.text
const getTextFromTweet = pipe(tweetUrl, getTweetObject, andThen(pullTextFromTweetObj), otherwise(() => undefined))
const getImagesFromTweet = pipe(tweetUrl, getTweetObject, andThen(pullImageFromTweetObj), otherwise(() => undefined))

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

exports.getImagesFromTweet = getImagesFromTweet
exports.getTextFromTweet = getTextFromTweet
exports.getTweetUrlsFromLikes = getTweetUrlsFromLikes