const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");

    if(message.channel.id === "838105742497415288") {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) return message.channel.send(`> ${cancel} Please mention a valid member of this server!`);
      else {

        if(!args[1] || args[1] <= 0 || isNaN(args[1])) {
          const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("AddXp")
          .setDescription(`${cancel} Wrong usage!
          \n> Usage: \`${prefix}addxp <@member/member ID> <amount>\`
          `)
          return message.channel.send(usageEmbed);
        }

        db.add(`xp.${message.guild.id}.${member.id}`, args[1]);

        message.delete();

        const addxpEmbed = new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setTitle("AddXp")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${confirm} You added \`${args[1]}\` xp to ${member}'s xp amount!`)
        message.channel.send(addxpEmbed);
      }
    }
  }

  module.exports.help = {
    name: "addxp",
    aliases: [],
    category: ""
}