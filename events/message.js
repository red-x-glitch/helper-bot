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
        let retweetUrl = msg.content
        if(msg.content.includes('neort')) retweetUrl = removeExtraRetweet(msg.content)
        if(msg.content.startsWith("https://twitter.com/") && tweetImages?.length <= 1) replaceWithFxTwitter(retweetUrl, msg)
	},
};