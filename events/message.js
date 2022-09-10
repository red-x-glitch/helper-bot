module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        if(msg.content.includes('neort')) {
            const endIndex = msg.content.indexOf(':neort')
            const retweetUrl = msg.content.substring(0, endIndex)

            const url = new URL(retweetUrl);
            url.hostname = "fxtwitter.com";

            msg.delete({ timeout: "1000" });
            msg.channel.send(`${url.href}`);
        }
        if (msg.content.startsWith("https://twitter.com/") && !msg.content.includes('neort')) {
            const url = new URL(msg);
            url.hostname = "fxtwitter.com";

            msg.delete({ timeout: "1000" });
            msg.channel.send(`${url.href}`);
        }
	},
};