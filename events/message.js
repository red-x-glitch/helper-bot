const { getImagesFromTweet, getTextFromTweet } = require('./../utils/twitter.js')

const removeExtraRetweet = (msg) => {
    let endIndex = msg.indexOf('<:neort')
    if (endIndex === -1) endIndex = msg.indexOf(':neort')
    return msg.substring(0, endIndex).trim()
}

const postImagesToThread = async (tweetImages, retweetUrl, msg) => {
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

const replaceWithVxTwitter = (twitterLink, msg) => {
    const vxTwitterLink = twitterLink.replace('twitter', 'vxtwitter')
    msg.delete({ timeout: "1000" })
    msg.channel.send(vxTwitterLink);
}

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        let retweetUrl = msg.content
        if(msg.content.includes('neort')) retweetUrl = removeExtraRetweet(msg.content)
        if(msg.content.startsWith("https://twitter.com/")){
            const tweetImages = await getImagesFromTweet(retweetUrl)
            if (tweetImages?.length > 1) postImagesToThread(tweetImages, retweetUrl, msg)
            else replaceWithVxTwitter(retweetUrl, msg)
        } 
	},
};