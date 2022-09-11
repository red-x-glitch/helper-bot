const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const getRandomItem = (pocketJson, startIndex=0, endIndex=24) => {
	const pocketItems = pocketJson.list;
	const tags = Object.values(pocketItems).map((item) => {
		return Object.keys(item?.tags)[0];
	});
	const uniqueTags = [...new Set(tags)];
    const dropdownOptions = uniqueTags.map(tag => {
        return {
            label: tag.substring(0,100),
            description: `Get a Random Item from ${tag}`.substring(0,100),
            value: tag.substring(0,100),
        }
    }).filter(option => option !== undefined)
    const dropdownOptionsFiltered = dropdownOptions.slice(startIndex, endIndex)
    if (endIndex < dropdownOptions.length) {
        const newStartIndex = startIndex + 25
        const newEndIndex = endIndex + 25
        dropdownOptionsFiltered.push({
            label: `view more: ${newStartIndex} - ${newEndIndex}`,
            description: 'view more tags',
            value: `view more: ${newStartIndex} - ${newEndIndex}`
        })
    }
	const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions(dropdownOptionsFiltered),
		);
	return row;
};

exports.getRandomItem = getRandomItem