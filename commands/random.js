const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRandomItem } = require('./../utils/pocketJson.js')
const fs = require('fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Picks a Random Item and Displays it!'),
	async execute(interaction) {
		fs.readFile('./pocketData.json', 'utf8', async (err, jsonString) => {
			if (err) {
				console.log('Error reading file from disk:', err);
				return;
			}
			try {
				const pocketJson = JSON.parse(jsonString);
				const row = getRandomItem(pocketJson);
				await interaction.reply({ content: 'Please Select One of the Following', components: [row], ephemeral:true });
			}
			catch (err) {
				console.log('Error parsing JSON string:', err);
			}
		});
	}
};
