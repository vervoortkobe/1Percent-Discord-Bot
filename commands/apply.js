const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");
    let pending = client.emojis.cache.get("838369495067918377");

    async function send() {

      dmEmbed = new Discord.MessageEmbed()
      .setColor(0x00ff00)
      .setDescription(`${confirm} I sent a DM message to apply your achievement, ${message.author}!`)
      message.channel.send(dmEmbed);

      const achEmbed = new Discord.MessageEmbed()
      .setColor(0x000)
      .setTitle("Achievement")
      .setThumbnail(message.guild.iconURL())
      .setDescription(`» You used the command \`${prefix}achievement\` in ${message.channel} to apply your achievement in Asphalt!
      \n> Please send proof of your achievement using a (link to a) screenshot.\n» You have \`60 seconds\` to reply, else your apply will be auto-cancelled!`)
      let firstMsg = await message.author.send(achEmbed);

      let filter = () => true;
      let collected = await firstMsg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(collected => {
        const applyLog = client.channels.cache.get("838105742497415288");
        if(collected.size === 1) {
          if(collected.first().content === "" && collected.first().attachments.first().url) {

            let applyEmbed = new Discord.MessageEmbed()
            .setColor(0x000)
            .setTitle("Achievement Apply")
            .setThumbnail(`https://cdn.discordapp.com/avatars/${collected.first().author.id}/${collected.first().author.avatar}.png`)
            .setDescription(`» Author: ${client.users.cache.get(collected.first().author.id)}\n» Status: ${pending}\`Pending\``)
            .setImage(collected.first().attachments.first().url)
            .setFooter(`» Author ID: ${collected.first().author.id}`)
            applyLog.send(applyEmbed);
            
            let successEmbed = new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setTitle("Apply Sent!")
            .setThumbnail(client.guilds.cache.get("836404365454737438").iconURL())
            .setDescription(`${confirm} I sent your Asphalt achievement apply in the apply log!
            \n» You will receive a DM when it gets accepted or rejected.`)
            client.users.cache.get(collected.first().author.id).send(successEmbed);
          }
          else if(collected.first().content.toLowerCase().includes(".png") || collected.first().content.toLowerCase().includes(".jpg") || collected.first().content.toLowerCase().includes(".jpeg") || collected.first().content.toLowerCase().includes(".webm")) {

            let applyEmbed = new Discord.MessageEmbed()
            .setColor(0x000)
            .setTitle("Achievement Apply")
            .setThumbnail(`https://cdn.discordapp.com/avatars/${collected.first().author.id}/${collected.first().author.avatar}.png`)
            .setDescription(`» Author: ${client.users.cache.get(collected.first().author.id)}\n» Status: ${pending}\`Pending\``)
            .setImage(collected.first().content)
            .setFooter(`» Author ID: ${collected.first().author.id}`)
            applyLog.send(applyEmbed);
            
            let successEmbed = new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setTitle("Apply Sent!")
            .setThumbnail(client.guilds.cache.get("836404365454737438").iconURL())
            .setDescription(`${confirm} I sent your Asphalt achievement apply in the apply log!
            \n» You will receive a DM when it gets accepted or rejected.`)
            client.users.cache.get(collected.first().author.id).send(successEmbed);
          } else {
            const wrongextEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Cancelled")
            .setThumbnail(client.guilds.cache.get("836404365454737438").iconURL())
            .setDescription(`${cancel} I **cancelled** your achievement apply, because the extension of the file or content you wanted to submit is incorrect!\n» Correct file extensions are: \`.png\`, \`.jpg\`, \`.jpeg\`, \`.webm\`.
            \n> If this was a mistake, you can re-apply by running the command \`${prefix}achievement\` again.`)
            return message.channel.send(wrongextEmbed);
          }
        }
      })
      .catch(collected => {
        const noresEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Cancelled")
        .setThumbnail(client.guilds.cache.get("836404365454737438").iconURL())
        .setDescription(`${cancel} You **cancelled** your achievement apply, because the timer ran out and you didn't respond!\n> If this was a mistake, you can re-apply by running the command \`${prefix}achievement\` again.`)
        return message.channel.send(noresEmbed);
      });
    }

    send().catch(err => {
      errEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle("Error!")
      .setThumbnail(message.guild.iconURL())
      .setDescription(`${cancel} Something went wrong!
      \n» I tried sending you a DM message to apply your achievement, but I couldn't!\n» Please check if you have your DM messages enabled and haven't blocked me, ${message.author}.`)
      return message.channel.send(errEmbed);
    });
  }

  module.exports.help = {
    name: "apply",
    aliases: [],
    category: ""
}