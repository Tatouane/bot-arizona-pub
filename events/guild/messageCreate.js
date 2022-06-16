const config = require('../../botconfig/config.json')
const discord = require('discord.js');
const fs = require('node:fs')
const db = require('quick.db')

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(client, message) {
        if (message.author.bot) return;

        client.xp(message)
        
        let prefixes = db.fetch(`prefix_${message.guild.id}`);
        if (prefixes == null) {
            prefix = config.prefix
        } else {
            prefix = prefixes;
        }

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        if (cmdName === 0) return;
        let cmd = client.commands.get(cmdName);
        if (!cmd) {
            message.reply(`La commande \`${prefix}${cmdName}\` n'existe pas.`)
        }
        else {
            if (config.vanish === 'true') {
                if (!message.member.permissions.has([cmd.permissions])) {
                    message.reply(`Vous n'avez pas les permissions \`${cmd.permissions}\``)
                }
                else {
                    try {
                        cmd.run(client, message, args)
                        message.channel.bulkDelete(1)
                    } catch (e) {
                        console.log(e)
                        message.reply(`Il y a eu une erreur: \`${e}\``)
                    }
                }
            } else {
                cmd.permissions.forEach(perms => {
                    if (!message.member.permissions.has([cmd.permissions])) {
                        message.reply(`Vous n'avez pas les permissions \`${cmd.permissions}\``)
                    }
                    else {
                        try {
                            cmd.run(client, message, args)
                        } catch (e) {
                            console.log(e)
                            message.reply(`Il y a eu une erreur: \`${e}\``)
                        }
                    }
                })
            }
        }
    }
}