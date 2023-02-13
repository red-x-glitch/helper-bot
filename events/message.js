const axios = require('axios').default;
const { consumer_key, access_token } = require('./../config.json');

const removeExtraRetweet = (msg) => {
    let endIndex = msg.indexOf('<:neort')
    if (endIndex === -1) endIndex = msg.indexOf(':neort')
    return msg.substring(0, endIndex).trim()
}

const replaceWithFxTwitter = (twitterLink, msg) => {
    const vxTwitterLink = twitterLink.replace('twitter', 'fxtwitter')
    msg.delete({ timeout: "1000" })
    msg.channel.send(vxTwitterLink);
}

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        if(msg.channelId == '873250338579308564') {
            const domain = new URL(msg.content).hostname.replace(/www*.\./, '').match(/(.*?)\./)[1]
            if (domain != 'fxtwitter') await axios.post('https://getpocket.com/v3/add', {
                'url': msg.content,
                'consumer_key': consumer_key,
                'access_token': access_token,
                'tags': domain,
            });
        }
        if(msg.content.startsWith("https://twitter.com/")) {
            let retweetUrl = msg.content
            if(msg.content.includes('neort')) retweetUrl = removeExtraRetweet(msg.content)
            replaceWithFxTwitter(retweetUrl, msg)
        } 
	}
};