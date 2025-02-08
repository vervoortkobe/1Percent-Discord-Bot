const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");

    let differarr = [];
    message.guild.members.cache.forEach(user => {
      differarr.push(user.id);
    });

    let allmemberlength = differarr.length;

    let mesarr = [];

    for(let i = 0; i < allmemberlength; i++) {
      let gettheamount = db.get(`xp.${message.guild.id}.${differarr[i]}`);

      let theamount;
      if(gettheamount) {
        theamount = gettheamount;
      } else {
        theamount = 0;
      }

      mesarr.push({
        name: differarr[i],
        amount: theamount
      });
    }

    mesarr.sort((a, b) => b.amount - a.amount);

    if(!args[0]) {
      let xp = db.get(`xp.${message.guild.id}.${message.author.id}`);
      if(!xp) xp = 0;

      var rankonlb;
      if(mesarr[0].name === message.author.id) rankonlb = "1st";
      else if(mesarr[1].name === message.author.id) rankonlb = "2nd";
      else if(mesarr[2].name === message.author.id) rankonlb = "3rd";
      else if(mesarr[3].name === message.author.id) rankonlb = "4th";
      else if(mesarr[4].name === message.author.id) rankonlb = "5th";
      else if(mesarr[5].name === message.author.id) rankonlb = "6th";
      else if(mesarr[6].name === message.author.id) rankonlb = "7th";
      else if(mesarr[7].name === message.author.id) rankonlb = "8th";
      else if(mesarr[8].name === message.author.id) rankonlb = "9th";
      else if(mesarr[9].name === message.author.id) rankonlb = "10th";
      else if(mesarr[10].name === message.author.id) rankonlb = "11th";
      else if(mesarr[11].name === message.author.id) rankonlb = "12th";
      else if(mesarr[12].name === message.author.id) rankonlb = "13th";
      else if(mesarr[13].name === message.author.id) rankonlb = "14th";
      else if(mesarr[14].name === message.author.id) rankonlb = "15th";
      else if(mesarr[15].name === message.author.id) rankonlb = "16th";
      else if(mesarr[16].name === message.author.id) rankonlb = "17th";
      else if(mesarr[17].name === message.author.id) rankonlb = "18th";
      else if(mesarr[18].name === message.author.id) rankonlb = "19th";
      else if(mesarr[19].name === message.author.id) rankonlb = "20th";
      else rankonlb = "20+";

      let actxp = db.get(`act.${message.guild.id}.${message.author.id}`);
      if(!actxp) actxp = 0;

      let xpEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag + "'s Xp", message.author.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setDescription(`**» Xp**: \`${xp}\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard
      \n**» Activity Xp**: \`${actxp}\` xp
      `)
      .setColor(0x000);
      return message.channel.send(xpEmbed);
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send(`> ${cancel} Please mention a valid member of this server!`);
    else {

      let xp = db.get(`xp.${message.guild.id}.${member.id}`);
      if(!xp) xp = 0;

      var rankonlb;
      if(mesarr[0].name === member.id) rankonlb = "1st";
      else if(mesarr[1].name === member.id) rankonlb = "2nd";
      else if(mesarr[2].name === member.id) rankonlb = "3rd";
      else if(mesarr[3].name === member.id) rankonlb = "4th";
      else if(mesarr[4].name === member.id) rankonlb = "5th";
      else if(mesarr[5].name === member.id) rankonlb = "6th";
      else if(mesarr[6].name === member.id) rankonlb = "7th";
      else if(mesarr[7].name === member.id) rankonlb = "8th";
      else if(mesarr[8].name === member.id) rankonlb = "9th";
      else if(mesarr[9].name === member.id) rankonlb = "10th";
      else if(mesarr[10].name === member.id) rankonlb = "11th";
      else if(mesarr[11].name === member.id) rankonlb = "12th";
      else if(mesarr[12].name === member.id) rankonlb = "13th";
      else if(mesarr[13].name === member.id) rankonlb = "14th";
      else if(mesarr[14].name === member.id) rankonlb = "15th";
      else if(mesarr[15].name === member.id) rankonlb = "16th";
      else if(mesarr[16].name === member.id) rankonlb = "17th";
      else if(mesarr[17].name === member.id) rankonlb = "18th";
      else if(mesarr[18].name === member.id) rankonlb = "19th";
      else if(mesarr[19].name === member.id) rankonlb = "20th";
      else rankonlb = "20+";

      let actxp = db.get(`act.${message.guild.id}.${member.id}`);
      if(!actxp) actxp = 0;

      let xpEmbed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag + "'s Xp", member.user.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setDescription(`**» Xp:** \`${xp}\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard
      \n**» Activity Xp**: \`${actxp}\` xp
      `)
      .setColor(0x000);
      return message.channel.send(xpEmbed);
    }
  }

  module.exports.help = {
    name: "xp",
    aliases: [],
    category: ""
}