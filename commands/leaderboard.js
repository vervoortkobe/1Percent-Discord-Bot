const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    //RANKONLB ARRAY 20+
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

    //LEADERBOARD ARRAY 11
    let difarr = [];
    message.guild.members.cache.forEach(user => {
      difarr.push(user.id);
    });

    let allmemberlent = difarr.length;
    let people = 0;
    let peopleToShow = 11;

    let mes = [];

    for(let i = 0; i < allmemberlent; i++) {
      let getamount = db.get(`xp.${message.guild.id}.${difarr[i]}`);

      let amount;
      if(getamount) {
        amount = getamount;
      } else {
        amount = 0;
      }

      mes.push({
        name: difarr[i],
        amount: amount
      });
    }

    let realArr = [];

    mes.sort((a, b) => b.amount - a.amount);
    
    const leaderboardEmbed = new Discord.MessageEmbed()

    for(let k = 0; k < mes.length; k++) {
      people++;

      if(people >= peopleToShow) continue;

      let ranking = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9." ,"10."];

      realArr.push(`\`${ranking[k]}\` \`Xp: ${mes[k].amount}\` xp ~ <@${mes[k].name}>`);
    }

    let finalLb = realArr.join("\n");

    leaderboardEmbed.setColor(0x000)
    leaderboardEmbed.setTitle("Leaderboard")
    leaderboardEmbed.setThumbnail(message.guild.iconURL())
    leaderboardEmbed.setDescription(`**» Your Rank:** \`${rankonlb}\` on the leaderboard
    \n${finalLb}
    `)
    message.channel.send(leaderboardEmbed);
  }

  module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"],
    category: ""
}