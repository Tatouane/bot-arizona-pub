const Discord = require('discord.js');
const config = require('./botconfig/config.json')

//------------------Creating Bot--------------------
const client = new Discord.Client({intents: 32767});

//------------------Handlers--------------------
['commands','buttons','selects', 'snipes', 'embeds'].forEach(x => client[x] = new Discord.Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectUtil'].forEach(handler =>{ require(`./utils/handlers/${handler}`)(client) });
require('./utils/functions')(client);

//---connecting the bot----
client.login(config.token);