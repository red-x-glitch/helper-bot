const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { consumer_key, access_token } = require('./../config.json');
const axios = require('axios').default;
const fs = require('fs');
let callTime = false;

const getRandomItem = (pocketJson) => {
	const pocketItems = pocketJson.list;
	const urls = Object.values(pocketItems).map((item) => {
		return item?.given_url;
	});
	const domains = urls.map(url => {
		const regexHost = /(.*?)\./g;
		const urlObject = new URL(url);
		const hostName = urlObject.hostname;
		return hostName;
	});
	const uniqueTags = [...new Set(domains)];
	const dropdownOptions = uniqueTags.map((tag, i) => {
		if(i < 25) {
			return {
				label: tag.substring(0,100),
				description: `Get a Random Item from ${tag}`.substring(0,100),
				value: tag.substring(0,100),
			}
		}
	})
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
		const dateToday = new Date();
		const timestamp = Date.parse(dateToday).toString();
		const currentTime = parseInt(timestamp.slice(0, -3));
		const timeOfCache = (typeof callTime) === 'number' ? parseInt(callTime) : false;
		console.log('this is the time cache ' + timeOfCache);
		console.log('this is the current time ' + currentTime);
		const timeDifference = (typeof callTime) === 'number' ? Math.abs(timeOfCache - currentTime) : false;
		console.log('this is the time difference ' + timeDifference);
		if (timeDifference && timeDifference < 3600) {
			console.log('reading from cache');
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
		else {
			console.log('making api call');
			const res = await axios.post('https://getpocket.com/v3/get', {
				'consumer_key': consumer_key,
				'access_token': access_token,
			});
			const pocketDataStringified = JSON.stringify(res.data);
			fs.writeFile('./pocketData.json', pocketDataStringified, err => {
				if (err) {
					console.log('Error writing file', err);
				}
				else {
					console.log('Successfully wrote file');
					fs.readFile('./pocketData.json', 'utf8', async (err, jsonString) => {
						if (err) {
							console.log('Error reading file from disk:', err);
							return;
						}
						try {
							const pocketJson = JSON.parse(jsonString);
							callTime = pocketJson.since;
							const row = getRandomItem(pocketJson);
							await interaction.reply({ content: 'Please Select One of the Following', components: [row], ephemeral:true });
						}
						catch (err) {
							console.log('Error parsing JSON string:', err);
						}
					});
				}
			});
		}
	},
};
