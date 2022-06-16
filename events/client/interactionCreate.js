const config = require('../../botconfig/config.json');
const messageCreate = require('../guild/messageCreate');
const discord = require('discord.js');
const Discord = require('discord.js');
const cConfig = require('../../botconfig/cConfig.json');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName)
            if (!cmd) return interaction.reply("Cette commande n'existe pas")
            else {
                if (!interaction.member.permissions.has([cmd.permissions])) {
                    interaction.reply(`Vous n'avez pas les permissions \`${cmd.permissions}\``)
                }
                else {
                    try {
                        cmd.runSlash(client, interaction)
                        interaction.channel.bulkDelete(1)
                    } catch (e) {
                        console.log(e)
                        interaction.reply(`Il y a eu une erreur: \`${e}\``)
                    }
                }
            }
        }
        else if (interaction.isSelectMenu('support')) {
            if (interaction.values.includes('support')) {
                interaction.guild.channels.create(`❓│${interaction.member.user.username}`, {
                    type: 'text',
                    parent: cConfig.support_support,
                    permissionOverwrites: [{
                        id: interaction.member.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: ['MANAGE_CHANNELS']
                    },
                    {
                        id: interaction.guild.roles.everyone.id,
                        allow: [],
                        deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: '973639899238527019',
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: []
                    }],
                }).then(async ticket => {
                    interaction.reply({ content: `Votre ticket a été ouvert dans <#${ticket.id}>`, ephemeral: true })

                    // const close = new Discord.MessageActionRow()
                    //     .addComponents(
                    //         new Discord.MessageButton()
                    //             .setCustomId('close')
                    //             .setLabel('🔒')
                    //             .setStyle('SECONDARY'),
                    //     );
                    const suppr = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('delete')
                                .setStyle('DANGER')
                                .setEmoji('🗑️'),
                            new Discord.MessageButton()
                                .setCustomId('claim')
                                .setStyle('SECONDARY')
                                .setEmoji('🔒')
                        );
                    const embed = new discord.MessageEmbed()
                        .setTitle(`Ticket de <@&${interaction.member.id}>`)
                        .setDescription(`Veuillez expliquer votre problème, un membre de l'<@&973639899238527019> vous prendra en charge.`)
                        .setFooter(`Support|${interaction.guild.name}`)
                    ticket.send({ content: `${interaction.member}<@&973639899238527019><@&973639899238527019>`, embeds: [embed], components: [suppr] })
                })
            }
            if (interaction.values.includes('partners')) {
                let general = interaction.guild.channels.create(`🤝│${interaction.member.user.username}`, {
                    type: 'text',
                    parent: cConfig.partners_support,
                    permissionOverwrites: [{
                        id: interaction.member.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: ['MANAGE_CHANNELS']
                    },
                    {
                        id: interaction.guild.roles.everyone.id,
                        allow: [],
                        deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: '973639899238527019',
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: []
                    },
                        // {
                        //     id: '963008192877588510',
                        //     allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES'],
                        //     deny: []
                        // }
                    ],
                }).then(ticket => {
                    interaction.reply({ content: `Votre ticket a été ouvert dans <#${ticket.id}>`, ephemeral: true })

                    const suppr = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('delete')
                                .setStyle('DANGER')
                                .setEmoji('🗑️'),
                            new Discord.MessageButton()
                                .setCustomId('claim')
                                .setStyle('SECONDARY')
                                .setEmoji('🔒')
                        );
                    const embed = new discord.MessageEmbed()
                        .setTitle(`Ticket de <@&${interaction.member.id}>`)
                        .setDescription(`Salut ! Tu veut faire un partenariat ? Check les <#968674507105652786> nous te guiderons pour la suite.`)
                        .setFooter(`Support|${interaction.guild.name}`)
                    ticket.send({ content: `${interaction.member}<@&973639899238527019>`, embeds: [embed], components: [suppr] })
                })
            }
            if (interaction.values.includes('recrutements')) {
                let general = interaction.guild.channels.create(`⚓│${interaction.member.user.username}`, {
                    type: 'text',
                    parent: cConfig.recrutement_support,
                    permissionOverwrites: [{
                        id: interaction.member.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: ['MANAGE_CHANNELS']
                    },
                    {
                        id: interaction.guild.roles.everyone.id,
                        allow: [],
                        deny: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: '973639899238527019',
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
                        deny: []
                    },
                        // {
                        //     id: '963008192877588510',
                        //     allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'MANAGE_MESSAGES'],
                        //     deny: []
                        // }
                    ],
                }).then(ticket => {
                    interaction.reply({ content: `Votre ticket a été ouvert dans <#${ticket.id}>`, ephemeral: true })

                    const suppr = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('delete')
                                .setStyle('DANGER')
                                .setEmoji('🗑️'),
                            new Discord.MessageButton()
                                .setCustomId('claim')
                                .setStyle('SECONDARY')
                                .setEmoji('🔒')
                        );
                    const embed = new discord.MessageEmbed()
                        .setTitle(`Ticket de <@&${interaction.member.id}>`)
                        .setDescription(`Tu as repmli le formulaire de recrutement ? Attends ici un membre de l'<@&973639899238527019> va te prendre en charge.`)
                        .setFooter(`Support|${interaction.guild.name}`)
                    ticket.send({ content: `<@&${interaction.member.id}> <@&973639899238527019>`, embeds: [embed], components: [suppr] })
                })
            }
        }
        else if (interaction.isButton('claim')) {
            let oldName = interaction.channel.name.split('│');
            let end = oldName[1];
            let user = client.users.cache.find(u => u.username = end);
            let embed = new discord.MessageEmbed()
                .setTitle(`Ticket claim`)
                .setDescription(`__**${user.username} votre ticket a été pris**__\n\n<a:pinkarrow:897888123864887306>${interaction.member.tag} a pris en charge le ticket.\n<a:pinkarrow:897888123864887306>Si vous rencontrez un problème avec le bot <@&${client.user.id}> merci de faire \`${config.prefix}report\` ou contacter Tatouane#0830.`)
            interaction.channel.send({ embeds: [embed] });
            interaction.channel.setName(`🔒│${end}`);
            interaction.channel.permissionOverwrites.edit(interaction.member.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
            interaction.channel.permissionOverwrites.edit('973639899238527019', { VIEW_CHANNEL: true, SEND_MESSAGES: false });
        }
        else if (interaction.isButton('delete')) {
            interaction.channel.send(`Le ticket va être supprimé dans quelques secondes`);
            interaction.channel.delete();
        }
    }
}