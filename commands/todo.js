const fetch = require("node-fetch");
const Discord = require('discord.js');


module.exports = {
  name: 'todo',
  description: 'adds a task to the todo list',
  execute(message, args) {
    
    task = args.join(" ");

    const embed  = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`How long would you like to spend on ${task}?`)
      .setDescription('Please enter a number in minutes.')
      .setFooter('Example: "30"');
    
      message.channel.send({embeds: [embed]}).then(
        message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const time = collected.first().content;
          // send a message to the channel that says "Good luck completing your task, {task}! A timer for {time} minutes has been started."
          message.channel.send(`Good luck completing your task, ${task}! A timer for ${time} minutes has started. ⏳`);
          // start a timer for {time} minutes
          // when the timer is half way done, send a message to the channel that says "@user, you are half way done! Keep going 🤍"
          setTimeout(function() {
            message.channel.send(`${message.author}, you are half way done! Keep going 🤍`);
          }
          , time * 60000 / 2);
          // when the timer runs out, send a message to the channel that says "The timer is up! Great job!"
          setTimeout(function() {
            message.channel.send(`Congrats ${message.author}! You finished your task! Enjoy a quick break! 🥳`);
          }
          , time * 60000);
        }
      ).catch(collected => {
        message.channel.send('You did not enter a number in time!');
      })
    );
  }
}





