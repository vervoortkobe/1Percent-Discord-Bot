const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    const helpEmbed = new Discord.MessageEmbed()
    .setColor(0x000)
    .setTitle("Help")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`***» My prefix is \`${prefix}\`!***\n***» You can view the leaderboard by using the \`${prefix}leaderboard\` command!***
    \n\`\`\`\n${prefix}achievement\n${prefix}achievements\n${prefix}addxp\n${prefix}apply\n${prefix}dbbackup\n${prefix}deletedb\n${prefix}eval\n${prefix}leaderboard\n${prefix}ping\n${prefix}restart\n${prefix}setxp\n${prefix}xp\`\`\``)
    message.channel.send(helpEmbed);
  }

  module.exports.help = {
    name: "help",
    aliases: [],
    category: ""
}