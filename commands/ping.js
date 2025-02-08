const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    const thonk = client.emojis.cache.get("837817120527351859");
    const rollback = client.emojis.cache.get("837819888013672448");

    const mEmbed = new Discord.MessageEmbed()
    .setColor(0x000)
    .setDescription(`${thonk} **|** ***Calculating...***`)

    const m = await message.channel.send(mEmbed);

    const pingEmbed = new Discord.MessageEmbed()
    .setColor(0x000)
    .setAuthor("Ping")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`***Pong!***
    \n> 💬 **| Message Latency:** \`${m.createdTimestamp - message.createdTimestamp}\`**ms**
    > ${rollback} **| Discord API Heartbeat:** \`${Math.round(client.ws.ping)}\`**ms**
    `)
    m.edit(pingEmbed);
  }

  module.exports.help = {
    name: "ping",
    aliases: [],
    category: ""
}