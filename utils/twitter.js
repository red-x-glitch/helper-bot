const { TwitterApi } = require('twitter-api-v2')
const { twitterApiKey } = require('./../config.json')
const { pipe, andThen } = require('ramda')

const tweetUrl = url => new URL(url)

const getTweetId = tweetUrl => tweetUrl.pathname.split("/").slice(-1)[0]

const twitterClient = new TwitterApi(twitterApiKey);

const getTweetObject = async (tweetUrl) => await twitterClient.v2.tweets(getTweetId(tweetUrl), {
    expansions: ['attachments.media_keys'],
    'media.fields': ['url'],
  })

const pullImageFromTweetObj = tweetObject => tweetObject.includes?.media.map(data => data?.url)

const pullTextFromTweetObj = tweetObject => tweetObject?.data[0]?.text

const getTextFromTweet = pipe(tweetUrl, getTweetObject, andThen(pullTextFromTweetObj))

const getImagesFromTweet = pipe(tweetUrl, getTweetObject, andThen(pullImageFromTweetObj))

exports.getImagesFromTweet = getImagesFromTweet
exports.getTextFromTweet = getTextFromTweet