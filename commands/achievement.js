const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");

    if(message.channel.id === "838105742497415288") {

      if(!args[0] || !args[0] === "accept" && !args[0] === "reject") {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Achievement")
        .setDescription(`${cancel} Wrong usage!
        \n> ${confirm} Accept: \`${prefix}achievement accept <message ID> <xp to add> <achievement>\`\n> ${cancel} Reject: \`${prefix}achievement reject <message ID> <reason>\`
        `)
        return message.channel.send(usageEmbed);
      }

//ACCEPT
      if(args[0] === "accept") {
        if(!args[1] || !args[2] || !args[3]) {
          const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("Achievement")
          .setDescription(`${cancel} Wrong usage!
          \n> ${confirm} Accept: \`${prefix}achievement accept <message ID> <xp to add> <achievement>\`\n> ${cancel} Reject: \`${prefix}achievement reject <message ID> <reason>\`
          `)
          return message.channel.send(usageEmbed);
        }

        message.channel.messages.fetch(args[1])
        .then(m => {
          if(m.partial) m.fetch().catch(err => {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Error!")
            .setDescription(`${cancel} Something went wrong!\nI couldn't fetch that message for some reason.
            \n» Error:\n\`\`\`${err}\`\`\``)
            return message.channel.send(errorEmbed);
          });

          let footer = m.embeds[0].footer.text;
          if(!footer) {
            const notfooterEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Achievement")
            .setDescription(`${cancel} The message with ID [\`${args[1]}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]}) in this channel (${message.channel}) is **not an achievement**!
            `)
            return message.channel.send(nofooterEmbed);
          }
          if(footer === "accepted" || footer === "rejected") {
            const alrEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Achievement")
            .setDescription(`${cancel} The achievement apply of the message with ID [\`${args[1]}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]}) in this channel (${message.channel}) is \`already accepted/rejected\` by ${message.guild.members.cache.find(member => member.tag === m.embeds[0].footer.text.split("by ")[1])}!
            `)
            return message.channel.send(alrEmbed);
          }

          let applier = message.guild.members.cache.find(member => member.id === m.embeds[0].footer.text.split("» Author ID: ")[1]);
          if(applier) {
            const dmacceptedEmbed = new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setTitle("Achievement Apply Accepted")
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${confirm} Hey, ${applier}!\nCongratulations, your achievement apply on ${message.guild.name} got **accepted**, so you earned \`${args[2]}\` xp!\nGood work!
            \n> » Server: \`${message.guild.name}\`\n> » Achievement: \`${args.slice(3).join(" ")}\`\n> » Reward: \`${args[2]}\` xp`)
            .setImage(m.embeds[0].image.url)
            applier.send(dmacceptedEmbed);
          }

          db.push(`ach.${message.guild.id}.${m.embeds[0].footer.text.split("» Author ID: ")[1]}`, { date: moment().format("DD-MM-YYYY"), acceptedby: message.author.id, xp: args[2], achname: args.slice(3).join(" "), applymsg: args[1] });

          db.add(`xp.${message.guild.id}.${m.embeds[0].footer.text.split("» Author ID: ")[1]}`, args[2]);

          message.delete();

          const acceptedEmbed = new Discord.MessageEmbed()
          .setColor(0x00ff00)
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setTitle("Achievement Apply Accepted")
          .setDescription(`${confirm} You accepted the achievement apply of ${applier} about \`${args.slice(3).join(" ")}\` and gave him/her \`${args[2]}\` xp as reward!
          \n» [\`Apply Message\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})`)
          message.channel.send(acceptedEmbed);

          const editacceptedEmbed = new Discord.MessageEmbed()
          .setColor(0x00ff00)
          .setTitle("Achievement Apply Accepted")
          .setThumbnail(m.embeds[0].thumbnail.url)
          .setDescription(m.embeds[0].description.split("\n» Status: ")[0] + `\n» Status: ${confirm} \`Accepted\` by ${message.author}\n» Achievement: \`${args.slice(3).join(" ")}\`\n» Reward: \`${args[2]}\` xp`)
          .setImage(m.embeds[0].image.url)
          .setFooter(`accepted by ${message.author.tag}`)
          m.edit(editacceptedEmbed);

        }).catch(err => {
          const errEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("Achievement")
          .setDescription(`${cancel} I couldn't find the message with ID [\`${args[1]}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]}) in this channel (${message.channel})!\nDoes that message exist?
          `)
          return message.channel.send(errEmbed);
        });
      }

//REJECT
      if(args[0] === "reject") {
        if(!args[1] || !args[2]) {
          const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("Achievement")
          .setDescription(`${cancel} Wrong usage!
          \n> ${confirm} Accept: \`${prefix}achievement accept <message ID> <XP to add> <achievement>\`\n> ${cancel} Reject: \`${prefix}achievement reject <message ID> <reason>\`
          `)
          return message.channel.send(usageEmbed);
        }

        message.channel.messages.fetch(args[1])
        .then(m => {
          if(m.partial) m.fetch().catch(err => {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Error!")
            .setDescription(`${cancel} Something went wrong!\nI couldn't fetch that message for some reason.
            \n» Error:\n\`\`\`${err}\`\`\``)
            return message.channel.send(errorEmbed);
          });

          let footer = m.embeds[0].footer.text;
          if(!footer) {
            const notfooterEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Achievement")
            .setDescription(`${cancel} The message with ID [\`${args[1]}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]}) in this channel (${message.channel}) is **not an achievement**!
            `)
            return message.channel.send(nofooterEmbed);
          }
          if(footer === "accepted" || footer === "rejected") {
            const alrEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Achievement")
            .setDescription(`${cancel} The achievement apply of the message with ID [\`${args[1]}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]}) in this channel (${message.channel}) is \`already accepted/rejected\` by ${message.guild.members.cache.find(member => member.tag === m.embeds[0].footer.text.split("by ")[1])}!
            `)
            return message.channel.send(alrEmbed);
          }

          let applier = message.guild.members.cache.find(member => member.id === m.embeds[0].footer.text.split("» Author ID: ")[1]);
          if(applier) {
            const dmrejectedEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Achievement Apply Rejected")
            .setThumbnail(message.guild.iconURL())
            .setDescription(`${cancel} Hey, ${applier}!\nSadly enough, your achievement apply on ${message.guild.name} got **rejected**, because of \`${args.slice(1).join(" ")}\`!\nMaybe you will have more luck another time...
            \n> » Server: \`${message.guild.name}\`\n> » Reason: \`${args.slice(2).join(" ")}\``)
            .setImage(m.embeds[0].image.url)
            applier.send(dmrejectedEmbed);
          }

          message.delete();

          const rejectedEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setTitle("Achievement Apply Rejected")
          .setDescription(`${cancel} You rejected the achievement apply of ${applier}, because of \`${args.slice(2).join(" ")}\`!
          \n» [\`Apply Message\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]})`)
          message.channel.send(rejectedEmbed);

          const editrejectedEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("Achievement Apply Rejected")
          .setThumbnail(m.embeds[0].thumbnail.url)
          .setDescription(m.embeds[0].description.split("\n» Status: ")[0] + `\n» Status: ${cancel} \`Rejected\` by ${message.author}\n» Reason: \`${args.slice(2).join(" ")}\``)
          .setImage(m.embeds[0].image.url)
          .setFooter(`rejected by ${message.author.tag}`)
          m.edit(editrejectedEmbed);

        }).catch(err => {
          const errEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setTitle("Achievement")
          .setDescription(`${cancel} I couldn't find the message with ID [\`${args[1]}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[1]}) in this channel (${message.channel})!\nDoes that message exist?
          `)
          return message.channel.send(errEmbed);
        });
      }
    }
  }

  module.exports.help = {
    name: "achievement",
    aliases: ["ach"],
    category: ""
}