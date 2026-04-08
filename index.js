const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Command handler
const prefix = '!';
const commands = new Map();

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (command) {
        command.execute(message, args);
    }
});

// Event handler
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Login the bot
client.login('YOUR_BOT_TOKEN_HERE');

// Example command registration
commands.set('ping', {
    execute: (message) => {
        message.channel.send('Pong!');
    },
});
