const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");

    if(message.channel.id === "838105742497415288") {
      if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`> ${cancel} You don't have permission to execute this command! Only Administrators can do so.`)

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) return message.channel.send(`> ${cancel} Please mention a valid member of this server!`);
      else {

        if(!args[1]) {
          const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("DelDB")
          .setDescription(`${cancel} Wrong usage!
          \n> Usage: \`${prefix}deldb <@member/member ID> <confirmation>\`
          `)
          return message.channel.send(usageEmbed);
        }

        db.delete(`xp.${message.guild.id}.${member.id}`);

        db.delete(`ach.${message.guild.id}.${member.id}`);

        message.delete();

        const deldbEmbed = new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setTitle("DelDB")
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${confirm} You deleted ${member}'s DataBase values (ach & xp) successfully!`)
        message.channel.send(deldbEmbed);
      }
    }
  }

  module.exports.help = {
    name: "deletedb",
    aliases: ["deldb"],
    category: ""
}