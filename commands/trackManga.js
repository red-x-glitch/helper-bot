const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { trackerEndpoint } = require('./../config.json');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('track')
		.setDescription('Tracks The Given Manga')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Title of Manga to Track')
				.setRequired(true)),
	async execute(interaction) {
		const mangaTitle = interaction.options.getString('title');
		const coverUrl = await axios.get(`${trackerEndpoint}/${mangaTitle}`);
		const coverEmbed = new MessageEmbed()
			.setColor('#e8d44f')
			.setTitle('Success!')
			.setDescription(`${mangaTitle} is now being tracked!`)
			.setImage(coverUrl.data.cover);
		await interaction.reply({ embeds: [coverEmbed] });
	},
};
