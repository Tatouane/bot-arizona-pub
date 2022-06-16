const config = require('../../botconfig/config.json')
const channel = require('../../botconfig/channelsConfig.json')
const ms = require('ms')
const Discord = require('discord.js')

module.exports = {
    name: 'mute',
    permissions: ['MUTE_MEMBERS'],
    description: "Mute une personne",
    category: 'modération',
    ownerOnly: false,
    usage: `mute <personne> <durée> <raison>`,
    exemples: [`mute @Tatouane 5minutes Tu parles trop`],
    run: (client, message) => {
        let mention = message.mentions.members.first();
        let args = message.content.split(" ");
        let reason = args.slice(3).join(" ");
        let time = args[2]

        if (mention == undefined) return message.reply(`Veuillez mentionner un membre`)
        else if (!reason) return message.reply(`Veuillez donner une raison`)
        else if (!time) return message.reply(`Temps mal ou indéfini`)

        if (mention.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.channel.send("Je ne peux pas mute cet utilisateur car il a un rôle plus élevé que moi.");
        if (mention.roles.highest.position > message.author.roles.highest.position) return message.reply(`Vous ne pouvez pas mute ${mention.user.tag} car il a un rôle plus élevé que vous.`)
        else try {
            let convertedTime = ms(time)
            mention.timeout(convertedTime, reason)
            let memberEmbed = new Discord.MessageEmbed()
                .setTitle(':x: Sanction: **Mute** :x:')
                .setDescription(`Vous avez été mute pendant ${time} sur le ${message.guild.name} par ${message.author.username} pour ${reason}.`)
                .setColor('RED')
                .setFooter(`Sanction | ${message.guild.name}`)
            mention.send({ embeds: [memberEmbed] })
            let embed = new Discord.MessageEmbed()
                .setTitle('Mute')
                .addFields(
                    { name: 'Membre mute', value: `<@${mention.user.id}>`, inline: true },
                    { name: 'Modérateur', value: `${message.author}`, inline: true },
                    { name: 'Raison', value: `${reason}`, inline: true },
                    { name: 'ID du membre mute', value: `${mention.user.id}`, inline: true }
                )
            message.channel.send({ embeds: [embed] });
            client.channels.cache.get(`${channel.logs}`).send({ embeds: [embed] }).catch(err => console.log(err))
        } catch (e) {
            return message.reply({ content: "Il y a eu une erreur: `" + e + "`", ephemeral: true })
        }
    },
    options: [
        {
            name: 'membre',
            description: 'Membre à mute',
            required: true,
            type: 'MENTIONABLE'
        },
        {
            name: 'durée',
            description: 'Temps pour lequel la personne sera mute.',
            required: true,
            type: 'STRING'
        },
        {
            name: 'raison',
            description: 'Raison pour laquelle la personne est mute.',
            required: true,
            type: 'STRING'
        },
    ],
    runSlash: (client, interaction) => {
        let mention = interaction.options.getMentionable('membre');
        let reason = interaction.options.getString('raison');
        let time = interaction.options.getString('durée')
        let convertedTime = ms(time)

        if (mention.roles.highest.position > interaction.guild.members.resolve(client.user).roles.highest.position) return interaction.reply("Je ne peux pas mute cet utilisateur car il a un rôle plus élevé que moi.");
        if (mention.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply(`Vous ne pouvez pas mute ${mention.user.tag} car il a un rôle plus élevé que vous.`)
        else try {
            mention.timeout(convertedTime, reason)
            let embed = new Discord.MessageEmbed()
                .setTitle('Mute')
                .addFields(
                    { name: 'Membre mute', value: `<@${mention.username}>`, inline: true },
                    { name: 'Modérateur', value: `${interaction.member}`, inline: true },
                    { name: 'Raison', value: `${reason}`, inline: true },
                    { name: 'ID du membre mute', value: `${mention.user.id}`, inline: true }
                )
            interaction.channel.send({ embeds: [embed] })
            client.channels.cache.get(`${channel.logs}`).send({ embeds: [embed] }).catch(err => console.log(err))
        } catch (e) {
            if (e = "DiscordAPIError: Missing Permissions") return interaction.reply(`Vous ne pouvez pas mute ${mention.user.tag}`)
            else return interaction.reply({ content: "Il y a eu une erreur: `" + e + "`", ephemeral: true })
        }
    }
}