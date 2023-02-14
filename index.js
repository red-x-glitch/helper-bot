// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const { token } = require('./config');
const express = require('express')


const app = express()
const port = 3000

app.get('/', (req, res) => {
  // Create a new client instance
	const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

	client.commands = new Collection();

	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}

	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args, client.commands));
		}
	}

	// Login to Discord with your client's token
	client.login(token);

	return res.send('Ready! Logged in as Helper#0396')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

