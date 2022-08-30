module.exports = {
	name: 'messageCreate',
	async execute(msg) {
        if (msg.content.startsWith("https://twitter.com/")) {
            const url = new URL(msg);
            url.hostname = "fxtwitter.com";

            msg.delete({ timeout: "1000" });
            msg.channel.send(`${url.href}`);
        }
	},
};