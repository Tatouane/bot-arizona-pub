const messageCreate = require("../events/guild/messageCreate");
const db = require('quick.db')

module.exports = (client) => {
    client.xp = (message) =>{
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, 10) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, 10)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Félicitations ${message.author}! Tu passes level ${newLevel}.`)
        }
    }
};