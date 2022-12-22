const { replaceWithFxTwitter } = require('../utils/messageHelpers.js')

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        if(msg.content.startsWith("https://twitter.com/")) {
            const vxTwitterLink = twitterLink.replace('twitter', 'fxtwitter')
            msg.delete({ timeout: "1000" })
            msg.channel.send(vxTwitterLink);
        }
	}
};