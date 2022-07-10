const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new-releases')
		.setDescription('Gets the newest releases on manga1000')
		.addIntegerOption(option =>
			option.setName('page')
				.setDescription('Page Number')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const page = interaction.options.getInteger('page');
			await interaction.deferReply({ ephemeral: true });
			await axios.get('https://manga-formatter-pknvgyyala-uc.a.run.app/manga-site-page/' + page.toString());
			await interaction.editReply({ content: 'Check Channel!', ephemeral: true });
		}
		catch (e) {
			await interaction.reply({ content: 'Error Error!', ephemeral: true });
		}

	},
};