const { SlashCommandBuilder } = require('@discordjs/builders');
const { consumer_key, access_token } = require('./../config.json');
const axios = require('axios').default;
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Refreshes the Cache'),
	async execute(interaction) {
		const res = await axios.post('https://getpocket.com/v3/get', {
			'consumer_key': consumer_key,
			'access_token': access_token,
		});
		const pocketDataStringified = JSON.stringify(res.data);
		fs.writeFile('./pocketData.json', pocketDataStringified, async err => {
			if (err) {
				console.log('Error writing file', err);
			}
			else {
				console.log('Successfully wrote file');
				await interaction.reply('Cache Refreshed');
			}
		});
	},
};
