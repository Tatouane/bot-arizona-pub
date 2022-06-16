const ms = require('ms');
const config = require('../../botconfig/config.json')

module.exports = {
    name: 'ready',
    once: false,
    execute(client){
        console.log(`Connecté en tant que ${client.user.tag}`);
        client.guilds.cache.get(config.guildID).commands.set(client.commands.map(cmd => cmd)).then((cmd) =>{
            console.log(`${cmd.size} slash commandes chargées.`)
        });

        client.guilds.cache.get('951771941625278475').channels.cache.get('967726662382919690').send(`<a:check:964209586368311356> **bot connecté** <a:check:964209586368311356>`)

        let state = 0;
        const presences = [
            { type: 'PLAYING', message: 'développé par Tatouane#0830' },
            { type: 'WATCHING', message: 'les modos faire leur travail' },
            { type: 'WATCHING', message: `${config.prefix}help` }
        ];
        setInterval(() => {
            state = (state + 1) % presences.length;
            const presence = presences[state];

            client.user.setActivity(presence.message, { type: presence.type });
        }, 5000);
    }
}