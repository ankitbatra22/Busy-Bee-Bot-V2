module.exports = {
  name: 'ping',
  description: 'this is the ping command!',
  execute(message, args) {
    message.channel.send('Pong! The Busy Bee is hard at work!')
  }

}

