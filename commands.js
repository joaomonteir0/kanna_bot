const Discord = require('discord.js');
const fetch = require('node-fetch');
const avatarEmbed = require('discord.js-avatar');

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Bacias commands')
	.setAuthor('Kanna Kamui', 'https://i.imgur.com/xPKm7Ii.jpeg')
	.addFields(
        { name: '!k help', value: '~> list of all commands'},
        { name: '!k love', value: '~> receive some love'},
        { name: '!k kanna', value: '~> random Kanna gif'},
        { name: '!k gif *KEY WORDS*', value: '~> search for a random gif according to the given key words'},
	)
    .setImage('https://media1.tenor.com/images/9874a8b8dfaa4131dadce066842fc006/tenor.gif?itemid=8053555');


module.exports = async function (msg){

    let tokens = msg.content.split(" ");

    console.log(msg.content);
    if(tokens[0] === '!k' && tokens[1] === "love" || tokens[0] === '!k' && tokens[1] === "Love"){
        love(msg);
    }

    if(tokens[0] === '!k' && tokens[1] === "help" || tokens[0] === '!k' && tokens[1] === "Help"){
        help(msg);
    }

    if(tokens[0] === '!k' && tokens[1] === "kanna" || tokens[0] === '!k' && tokens[1] === "Kanna"){
        let url = `https://g.tenor.com/v1/search?q=kanna&key=${process.env.TENORKEY}&limit=8`;
        let response = await fetch(url);
        let json = await response.json();
        console.log(json);

        let index = Math.floor(Math.random() * json.results.length);
        msg.channel.send(json.results[index].url);
    }

    if(tokens[0] === '!k' && tokens[1] === "gif" || tokens[0] === '!k' && tokens[1] === "Gif"){
        
        let keywords = "karma puta";
        if (tokens.length > 2) {
          keywords = tokens.slice(2, tokens.length).join(" ");
        }
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=off`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        msg.channel.send(json.results[index].url);

    }

    if(tokens[0] === '!k' && tokens[1] === 'avatar'){
        const user = msg.mentions.users.first() || msg.author;
        const avatarEmbed = new Discord.MessageEmbed()
        .setColor(0x333333)
        .setAuthor(`${user.username}'s Avatar`)
        .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=256`);
        msg.channel.send(avatarEmbed);

    }

}

function love(msg){
    msg.reply(':heart: :rainbow: ');
}

function help(msg){
    msg.channel.send(helpEmbed);
}
