const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;
const db = require("quick.db");
const moment = require("moment");
const exec = require("child_process").exec;

module.exports.run = async (client, message, args) => {

    let confirm = client.emojis.cache.get("838082677177057370");
    let cancel = client.emojis.cache.get("838082687624675328");

    if(message.author.id === "408289224761016332" || message.author.id === "300987075543433216") {
      
      const restartEmbed = new Discord.MessageEmbed()
      .setColor(0x00ff00)
      .setTitle("Restart")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`${confirm} Restarting the bot in \`3 seconds\`...\n» This might take some time.`)
      message.channel.send(restartEmbed)
      
      setTimeout(() => {
        process.kill(1);
        exec("node index.js", function (error, stdout, stderr) {
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
          if(err) console.log("exec error: " + err);
        });
      }, 3000);
    }
  }

module.exports.help = {
  name: "restart",
  aliases: [],
  category: ""
}