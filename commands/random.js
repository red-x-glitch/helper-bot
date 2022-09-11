const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { consumer_key, access_token } = require('./../config.json');
const axios = require('axios').default;
const fs = require('fs');

const getRandomItem = (pocketJson) => {
	const pocketItems = pocketJson.list;
	const tags = Object.values(pocketItems).map((item) => {
		return Object.keys(item?.tags)[0];
	});
	const uniqueTags = [...new Set(tags)];
	const dropdownOptions = uniqueTags.map((tag, i) => {
		if(i < 25) {
			return {
				label: tag.substring(0,100),
				description: `Get a Random Item from ${tag}`.substring(0,100),
				value: tag.substring(0,100),
			}
		}
	}).filter(option => option !== undefined)
	const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions(dropdownOptions),
		);
	return row;
};
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
