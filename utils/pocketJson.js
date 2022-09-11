const { MessageActionRow, MessageSelectMenu } = require('discord.js');

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

exports.getRandomItem = getRandomItem