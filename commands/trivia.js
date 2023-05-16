const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
    name: 'trivia',
    description: 'Ask a question and get a response from the Trivia API.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#0099ff');
        embed.setTitle('Busy Bee Trivia!');
        embed.setDescription('Pick a Category');
        embed.addField('Categories', '`general`, `books`, `film`, `music`, `tv`, `video_games`, `board_games`, `science`, `computers`, `mathematics`, `mythology`, `sports`, `geography`, `history`, `politics`, `art`, `celebrities`, `animals`, `vehicles`, `comics`, `gadgets`, `anime`, `cartoon`');
        message.channel.send({embeds: [embed]}).then(
            message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const category = collected.first().content;
                if (category === 'general' || category === 'books' || category === 'film' || category === 'music' || category === 'tv' || category === 'video_games' || category === 'board_games' || category === 'science' || category === 'computers' || category === 'mathematics' || category === 'mythology' || category === 'sports' || category === 'geography' || category === 'history' || category === 'politics' || category === 'art' || category === 'celebrities' || category === 'animals' || category === 'vehicles' || category === 'comics' || category === 'gadgets' || category === 'anime' || category === 'cartoon' || category === 'geek' || category === 'random') {
                    const question = new Discord.MessageEmbed();
                    question.setColor('#0099ff');
                    question.setTitle('Busy Bee Trivia');
                    question.setDescription('Pick a Question Difficulty');
                    question.addField('Difficulties', '`easy`, `medium`, `hard`');

                    message.channel.send({embeds: [question]}).then(
                        message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ['time'] })
                        .then(collected => {
                            const difficulty = collected.first().content.toLowerCase();
                            if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
                                arr = ['general', 'books', 'film', 'music', 'theatre', 'tv', 'video_games', 'board_games', 'science', 'computers', 'mathematics', 'mythology', 'sports', 'geography', 'history', 'politics', 'art', 'celebrities', 'animals', 'vehicles', 'comics', 'gadgets', 'anime', 'cartoon'];
                                cat = arr.indexOf(category)+9;
                                fetch('https://opentdb.com/api.php?amount=1&category=' + cat + '&difficulty=' + difficulty + '&type=multiple')
                                    .then(res => res.json())
                                    .then(json => {
                                        //const question = json.results[0].question.replace(/<\/?[^>]+(>|$)/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'");
                                        let answers = [json.results[0].correct_answer, ...json.results[0].incorrect_answers].map(answer => answer.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#039;/g, "'"));
                                        let randomAnswers = answers.sort(() => Math.random() - 0.5);
                                        let question = json.results[0].question.replace(/&#039;/g, "'").replace(/&quot;/g, '"');
                                        
                                        const ask = new Discord.MessageEmbed();
                                        ask.setColor('#0099ff');
                                        ask.setTitle('Busy Bee Trivia');
                                        ask.setDescription(question);
                                        ask.addField('Options', randomAnswers.map((answer, index) => `${index + 1}. ${answer}`).join('\n'));
                                        ask.addField('Type your answer!', '\u200b')
                                        ask.setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());

                                        message.channel.send({embeds: [ask]}).then(
                                            message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ['time'] })
                                            .then(collected => {
                                                if (collected.first().content.toLowerCase() === json.results[0].correct_answer.toLowerCase()) {
                                                    const correct = new Discord.MessageEmbed();
                                                    correct.setColor('#0099ff');
                                                    correct.setTitle('Busy Bee Trivia');
                                                    correct.setDescription('Correct!');
                                                    correct.addField('Question', question);
                                                    correct.addField('Answer', json.results[0].correct_answer);
                                                    correct.setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());

                                                    message.channel.send({embeds: [correct]});
                                                } else {
                                                    const incorrect = new Discord.MessageEmbed();
                                                    incorrect.setColor('#0099ff');
                                                    incorrect.setTitle('Busy Bee Trivia');
                                                    incorrect.setDescription('Incorrect!');
                                                    incorrect.addField('Question', question);
                                                    incorrect.addField('Correct Answer', json.results[0].correct_answer);
                                                    incorrect.addField('Your Answer', collected.first().content);
                                                    incorrect.setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());

                                                    message.channel.send({embeds: [incorrect]});
                                                }
                                            })
                                            .catch(collected => {
                                                const timeout = new Discord.MessageEmbed();
                                                timeout.setColor('#0099ff');
                                                timeout.setTitle('Busy Bee Trivia');
                                                timeout.setDescription('You did not answer in time!');
                                                timeout.addField('Question', question);
                                                timeout.addField('Correct Answer', json.results[0].correct_answer);
                                                timeout.setFooter('Trivia question sent by ' + message.author.username, message.author.avatarURL());

                                                message.channel.send({embeds: [timeout]});
                                            })
                                        );
                                    });
                            } else {
                                const invalid = new Discord.MessageEmbed();
                                invalid.setColor('#0099ff');
                                invalid.setTitle('Busy Bee Trivia');
                                invalid.setDescription('Invalid Difficulty!');
                                invalid.addField('Difficulties', '`easy`, `medium`, `hard`');

                                message.channel.send({embeds: [invalid]});
                            }
                        })
                        .catch(collected => {
                            const timeout = new Discord.MessageEmbed();
                            timeout.setColor('#0099ff');
                            timeout.setTitle('Busy Bee Trivia');
                            timeout.setDescription('You did not answer in time!');
                            timeout.addField('Difficulties', '`easy`, `medium`, `hard`');

                            message.channel.send({embeds: [timeout]});
                        })
                    );
                } else {
                    const invalidDiff = new Discord.MessageEmbed();
                    invalidDiff.setColor('#0099ff');
                    invalidDiff.setTitle('Busy Bee Trivia');
                    invalidDiff.setDescription('Invalid Difficulty!');
                    invalidDiff.addField('Difficulties', '`easy`, `medium`, `hard`');

                    message.channel.send({embeds: [invalidDiff]});
                }
            })
            .catch(collected => {
                const timeout = new Discord.MessageEmbed();
                timeout.setColor('#0099ff');
                timeout.setTitle('Busy Bee Trivia');
                timeout.setDescription('You did not answer in time!');
                timeout.addField('Difficulties', '`easy`, `medium`, `hard`');

                message.channel.send({embeds: [timeout]});
            })
        );

    }
}