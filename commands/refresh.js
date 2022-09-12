const { SlashCommandBuilder } = require('@discordjs/builders');
const { consumer_key, access_token } = require('./../config.json');
const axios = require('axios').default;
const fs = require('fs');
const { writeToFile } = require('../utils/files');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Refreshes the Cache'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const res = await axios.post('https://getpocket.com/v3/get', {
			'consumer_key': consumer_key,
			'access_token': access_token,
			'detailType': 'complete',
		});
		const returnReply = async (err = undefined) => err ? await interaction.editReply('There was an error') : await interaction.editReply('Cache Refreshed');
		const pocketDataStringified = JSON.stringify(res.data);
		writeToFile('./pocketData.json', pocketDataStringified, returnReply)
	},
};
