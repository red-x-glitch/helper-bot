const { SlashCommandBuilder } = require('@discordjs/builders');
const { readFromFile } = require('../utils/files.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_twitter_like')
		.setDescription('Picks a Random Twitter Like and Displays it!'),
	async execute(interaction) {
		const returnTwitterLikeUrl = async (twitterLikes) => {
			const twitterLikeUrls = JSON.parse(twitterLikes);
            const values = Object.values(twitterLikeUrls)
            const randomTwitterLike = values[parseInt(Math.random() * values.length)]
            await interaction.reply(randomTwitterLike)
		}
		readFromFile('./twitterLikes.json', returnTwitterLikeUrl)
	}
};
