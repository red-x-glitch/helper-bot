const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const getRandomItem = (pocketJson, startIndex=0, endIndex=24) => {
	const pocketItems = pocketJson.list;
	const tags = Object.values(pocketItems).map((item) => {
		return Object.keys(item?.tags)[0];
	});
	const uniqueTags = [...new Set(tags)];
    const dropdownOptions = []
    let updatedEndIndex = endIndex > uniqueTags.length ? uniqueTags.length : endIndex
    for(let i=startIndex; i<updatedEndIndex; i++){
        dropdownOptions.push({
            label: uniqueTags[i].substring(0,100),
            description: `Get a Random Item from ${uniqueTags[i]}`.substring(0,100),
            value: uniqueTags[i].substring(0,100),
        })
    }
    if(updatedEndIndex !== uniqueTags.length) {
        dropdownOptions.push({
            label: 'view more',
            description: 'view more tags',
            value: 'view more'
        })
    }
	const dropdownOptionsFiltered = dropdownOptions.filter(option => option !== undefined)
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