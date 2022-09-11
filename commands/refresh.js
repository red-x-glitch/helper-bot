const { SlashCommandBuilder } = require('@discordjs/builders');
const { consumer_key, access_token } = require('./../config.json');
const axios = require('axios').default;
const fs = require('fs');

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
		const pocketDataStringified = JSON.stringify(res.data);
		fs.writeFile('./pocketData.json', pocketDataStringified, async err => {
			if (err) {
				console.log('Error writing file', err);
				await interaction.editReply('There was an error')
			}
			else {
				await interaction.editReply('Cache Refreshed');
			}
		});
	},
};
