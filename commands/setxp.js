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

        if(!args[1] || isNaN(args[1])) {
          const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("SetXp")
          .setDescription(`${cancel} Wrong usage!
          \n> Usage: \`${prefix}setxp <@member/member ID> <amount>\`
          `)
          return message.channel.send(usageEmbed);
        }

        db.set(`xp.${message.guild.id}.${member.id}`, args[1]);

        message.delete();

        const setxpEmbed = new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setTitle("SetXp")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${confirm} You set ${member}'s xp amount to \`${args[1]}\` xp!`)
        message.channel.send(setxpEmbed);
      }
    }
  }

  module.exports.help = {
    name: "setxp",
    aliases: [],
    category: ""
}