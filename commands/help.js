const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'gives all commands',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Commands')
      .setDescription('Here are all the commands you can use.')
      .addFields(
        { name: '!help', value: 'gives all commands' },
        { name: '!todo', value: 'adds a task to the todo list' },
        { name: '!motivation', value: 'gives a motivational quote' },
        { name: '!reminders', value: 'helpful reminders for your mental and physical health' }, 
        { name: '!selfcare', value: 'de-stressing, self-care tips' },
        { name: '!subs', value: 'How many subscribers Breanna currently has' },
        { name: '!trivia', value: 'Coming Soon...' },

      )
      .setFooter('More commands coming soon!');

    message.channel.send({embeds: [embed]});


  }
}
