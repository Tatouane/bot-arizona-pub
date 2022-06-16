const config = require('../../botconfig/config.json')

module.exports = {
    name: 'snipe',
    category: 'admin',
    permissions:['MANAGE_MESSAGES'],
    description: "Envoie le dernier message supprimé dans le salon",
    ownerOnly: false,
    usage: 'snipe',
    exemples: [`snipe`],
    run:(client, message, args) =>{
        let msg = client.snipes.get(message.channel.id, message)
        if(!msg)return message.reply("Aucun message n'a été supprimé dans ce salon.")
        message.channel.send(msg)
    },
    runSlash:(client, interaction) =>{
        let msg = client.snipes.get(interaction.channel.id, interaction)
        if(!msg)return interaction.reply("Aucun message n'a été supprimé dans ce salon.")
        interaction.channel.send(msg)
    }
}