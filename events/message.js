const { getImagesFromTweet } = require('./../utils/twitter.js')

const replaceWithFxTwitter = (twitterLink, msg) => {
    const vxTwitterLink = twitterLink.replace('twitter', 'fxtwitter')
    msg.delete({ timeout: "1000" })
    msg.channel.send(vxTwitterLink);
}

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        const tweetImages = await getImagesFromTweet(msg.content)
        if(msg.content.startsWith("https://twitter.com/") && tweetImages?.length <= 1) replaceWithFxTwitter(msg.content, msg)    
	},
};