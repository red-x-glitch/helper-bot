const { SlashCommandBuilder } = require('@discordjs/builders');
const { authorId } = require('./../config');
const { writeToFile } = require('../utils/files');
const { getTweetUrlsFromLikes } = require('../utils/twitter');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh_twitter_cache')
		.setDescription('Refreshes Twitter Cache'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const returnReply = async (err = undefined) => err ? await interaction.editReply('There was an error') : await interaction.editReply('Cache Refreshed');
		const tweetUrlsFromLikes = await getTweetUrlsFromLikes(authorId)
        const tweetUrlsFromLikesJson = JSON.stringify({...tweetUrlsFromLikes})
		writeToFile('./cache/twitterLikes.json', tweetUrlsFromLikesJson, returnReply)
	},
};