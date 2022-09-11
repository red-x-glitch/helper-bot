const { SlashCommandBuilder } = require('@discordjs/builders');
const { getRandomItem } = require('./../utils/pocketJson.js')
const fs = require('fs');
const { readFromFile } = require('../utils/files.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Picks a Random Item and Displays it!'),
	async execute(interaction) {
		const returnTagsMenu = async (pocketJsonString) => {
			const pocketJson = JSON.parse(pocketJsonString);
			const row = getRandomItem(pocketJson);
			await interaction.reply({ content: 'Please Select One of the Following', components: [row], ephemeral:true });
		}
		readFromFile(returnTagsMenu)
	}
};
