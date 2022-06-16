module.exports = {
    name: 'messageDelete',
    once: false,
    execute(client, message) {
        client.snipes.set(message.channel.id, message)
    }
}