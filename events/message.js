const { getImagesFromTweet, getTextFromTweet } = require('./../utils/twitter.js')

const removeExtraRetweet = (msg) => {
    const endIndex = msg.indexOf(':neort')
    return msg.substring(0, endIndex).trim()
}

const postImagesToThread = async (retweetUrl, msg) => {
    const tweetImages = await getImagesFromTweet(retweetUrl)
    if(tweetImages?.length > 1) {
        const tweetText = await getTextFromTweet(retweetUrl)
        const thread = await msg.channel.threads.create({
            name: tweetText,
            autoArchiveDuration: 60,
            reason: 'Images From Tweet',
        });
        const webhooks = await msg.channel.fetchWebhooks();
        const webhook = webhooks.first();
        tweetImages.forEach(async img => await webhook.send({
            content: img,
            threadId: thread.id,
        }))
    }
}

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        let retweetUrl = msg.content
        if(msg.content.includes('neort')) retweetUrl = removeExtraRetweet(msg.content)
        if(msg.content.startsWith("https://twitter.com/")) postImagesToThread(retweetUrl, msg)
	},
};