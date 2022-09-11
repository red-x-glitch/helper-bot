const { readFromFile } = require('../utils/files.js');
const { getRandomItem } = require('./../utils/pocketJson.js')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, commands) {

		const returnRandomItem = async (pocketJsonString) => {
			const tagValue = interaction.values[0];
			const pocketJson = JSON.parse(pocketJsonString);
			const pocketItems = pocketJson.list;
			const filteredItemList = Object.values(pocketItems).filter((item) => {
				return Object.keys(item?.tags)[0] == tagValue;
			});
			const randomItem = filteredItemList[Math.floor(Math.random() * filteredItemList.length)]?.given_url;
			await interaction.reply({ content: randomItem });
		}

		const viewMore = async (pocketJsonString) => {
			const pocketJson = JSON.parse(pocketJsonString);
			const indexes = interaction.values[0].split(':')[1].split('-').map(index => parseInt(index))
			const row = getRandomItem(pocketJson, indexes[0], indexes[1]);
			await interaction.reply({ content: 'Please Select One of the Following', components: [row], ephemeral:true });
		}

		if (interaction.isCommand()) {
			const command = commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

		if (interaction.isSelectMenu()) {
			if (interaction.values[0].includes('view more')) readFromFile(viewMore) 
			else readFromFile(returnRandomItem)
		}
	},
};