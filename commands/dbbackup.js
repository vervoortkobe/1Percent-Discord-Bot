const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");
    let rollback = client.emojis.cache.get("837819888013672448");

    if(message.channel.id === "838105742497415288") {

      let xpdb = db.fetch(`xp.${message.guild.id}`);
      let achdb = db.fetch(`ach.${message.guild.id}`);
      let date = {"date": `${moment().format("DD-MM-YYYY")}`};

      message.channel.send(`> ${rollback} Preparing a backup of the DataBase...`)
      .then(m => m.delete({ timeout: 500 }));

      setTimeout(() => {
        let array = [];
        array.push(date);
        array.push(achdb);
        array.push(xpdb);

        fs.writeFile("./dbbackup.json", JSON.stringify(array), (err) => {
          if(err) console.log(err);
        });
      }, 500);

      setTimeout(() => {
        const dbbackupEmbed = new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setTitle("DBBackup")
        .setThumbnail(message.guild.iconURL())
        .setDescription(`${confirm} You made a backup of the DataBase on \`${moment().format("DD-MM-YYYY")}\`!`)
        message.channel.send(dbbackupEmbed);
        message.channel.send({ files: ["./dbbackup.json"] });
      }, 500);
    }
  }

  module.exports.help = {
    name: "dbbackup",
    aliases: [],
    category: ""
}