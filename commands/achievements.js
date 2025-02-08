const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");

    if(message.channel.id === "838105742497415288") {
    
      if(!args[0]) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Achievements")
        .setDescription(`${cancel} Usage: ${prefix}achievements <@user/user ID>`)
        return message.channel.send(usageEmbed);
      }

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) {
        let achInfo = db.fetch(`ach.${message.guild.id}.${args[0]}`);

        if(!achInfo) {
          const noachsEmbed = new Discord.MessageEmbed()
          .setColor(0x000)
          .setTitle("Achievements")
          .setThumbnail(message.guild.iconURL())
          .setDescription(`${cancel} This user doesn't have any achievements yet!`)
          return message.channel.send(noachsEmbed);
        }
    
        const achsEmbed = new Discord.MessageEmbed()
        .setColor(0x000)
        .setTitle("Achievements")
        .setThumbnail(message.guild.iconURL())
    
        for(let achs of achInfo) {
          let date = achs.date;
          let acceptedby = achs.acceptedby;
          let xp = achs.xp;
          let achname = achs.achname;
          let applymsg = achs.applymsg;
    
          achsEmbed.addField(`\`${achname}\``, `» Date: \`${date}\`\n» Accepted By: <@${acceptedby}>\n» Apply: [\`Message\`](https://discord.com/channels/${message.guild.id}/${args[0]}/${applymsg})\n» Reward: \`${xp}\` xp`, true);
        }

        return message.channel.send(achsEmbed)
        .catch(err => {
          const errorEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setDescription(`${cancel} This user has too many achievements to display!`)
          return message.channel.send(errorEmbed);
        });
      }

      let achInfo = db.fetch(`ach.${message.guild.id}.${member.id}`);

      if(!achInfo) {
        const noachsEmbed = new Discord.MessageEmbed()
        .setColor(0x000)
        .setTitle(`${member.user.tag}'s Achievements`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${cancel} This user doesn't have any achievements yet!`)
        return message.channel.send(noachsEmbed);
      }

      const achsEmbed = new Discord.MessageEmbed()
      .setColor(0x000)
      .setTitle(`${member.user.tag}'s Achievements`)
      .setThumbnail(member.user.displayAvatarURL())

      for(let achs of achInfo) {
        let date = achs.date;
        let acceptedby = achs.acceptedby;
        let xp = achs.xp;
        let achname = achs.achname;
        let applymsg = achs.applymsg;
  
        achsEmbed.addField(`\`${achname}\``, `» Date: \`${date}\`\n» Accepted By: <@${acceptedby}>\n» Apply: [\`Message\`](https://discord.com/channels/${message.guild.id}/${member.id}/${applymsg})\n» Reward: \`${xp}\` xp`, true);
      }

      message.channel.send(achsEmbed)
      .catch(err => {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setDescription(`${cancel} This user has too many warnings to display!`)
        return message.channel.send(errorEmbed);
      });
    }
  }

  module.exports.help = {
    name: "achievements",
    aliases: ["achs"],
    category: ""
}