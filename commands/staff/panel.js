const config = require('../../botconfig/config.json')
const Discord = require('discord.js')

module.exports = {
    name: 'panel',
    category: 'staff',
    permissions: ['ADMINISTRATOR'],
    description: "Envoie l'embed de support",
    ownerOnly: false,
    usage: 'panel',
    exemples: [`panel`],
    run: (client, message, args) => {
        let support = new Discord.MessageEmbed()
            .setTitle('Support')
            .setDescription('Tout ticket troll/spam sera sanctionné.')
            .setFooter({ text: `Support │ ${message.member.guild.name}` })
        const selector = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('support')
                    .setPlaceholder('Choisissez la catégorie de votre ticket')
                    .addOptions([
                        {
                            label: '⚓┃Recrutements',
                            value: 'recrutements',
                        },
                        {
                            label: '🤝┃Partenariats',
                            value: 'partners',
                        },
                        {
                            label: '❓┃Questions/autre',
                            value: 'support',
                        }
                    ]),
            );
        message.channel.send({ embeds: [support], components: [selector] })
    },
    runSlash: (client, interaction) => {
        let support = new Discord.MessageEmbed()
            .setTitle('Support')
            .setDescription('Tout ticket troll/spam sera sanctionné.')
            .setFooter({ text: `Support │ ${interaction.guild.name}` })
        const selector = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('support')
                    .setPlaceholder('Choisissez la catégorie de votre ticket')
                    .addOptions([
                        {
                            label: '⚓┃Recrutements',
                            value: 'recrutements',
                        },
                        {
                            label: '🤝┃Partenariats',
                            value: 'partners',
                        },
                        {
                            label: '❓┃Questions/autre',
                            value: 'support',
                        }
                    ]),
            );
        interaction.channel.send({ embeds: [support], components: [selector] })
    }
}