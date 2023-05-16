const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: 'bored',
    description: 'Something to do when bored',
    execute(message, args) {
        fetch('https://www.boredapi.com/api/activity?price=0')
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                const embed = new Discord.MessageEmbed()
                    embed.setColor('#0099ff')
                    embed.setTitle("Busy Bee's Recommendation: ")
                    embed.setDescription(data.activity)
                    if (data.link) {
                        embed.setFooter(`A place to ${data.link}`)
                    }
                    
                message.channel.send({embeds: [embed]});
            }).catch(function(err) {
                console.log(err);
                message.channel.send('Something went wrong. Please try again later.');
            }
        )
    }
}
