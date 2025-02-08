const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.use(express.static("public"));

const listener = app.listen(process.env.PORT, function() {
  console.log("✔️  Your app is listening on port: " + listener.address().port);
});

/////////////////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: new Discord.Intents(Discord.Intents.ALL) }, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const prefix = process.env.PREFIX;
const fetch = require("node-fetch");
const db = require("quick.db");
const moment = require("moment");

fs.readdir("./commands/", (err, files) => {
 
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("\x1b[31m", "❌  I couldn't find the commands map!");
    console.log("\x1b[0m", "");
    return;
  }
   
  jsfile.forEach((f, i) => {

    let props = require(`./commands/${f}`);
    console.log("\x1b[0m", "•", "\x1b[4m", `${f}`, "\x1b[0m", "was loaded!");
    client.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
    
  });

});


  client.on("ready", async () => {
    fs.readdir("./commands/", (err, files) => {
      let jsfile = files.filter(f => f.split(".").pop() === "js");

      console.log("\x1b[0m", "");
      console.log("\x1b[36m", `» All ${jsfile.length} commands were loaded!`);
      console.log("\x1b[36m", `» Serving ${client.guilds.cache.size} servers!`);
      console.log("\x1b[36m", `${client.guilds.cache.forEach(server => console.log(server.name))}`);
      console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
      console.log("\x1b[0m", "");

    });
    client.user.setActivity(`${process.env.PREFIX}help | ${client.user.username}`, {type: "PLAYING"});
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//GUILDS LOG JOIN
  client.on("guildCreate", guild => {
    console.log(`JOINED: ${guild.name} - ${guild.id}; ${guildowner.tag} - ${guild.ownerID}; ${guild.memberCount} members; Serving ${client.guilds.cache.size} servers, Serving ${client.users.cache.size} users;`);
  });

//GUILDS LOG LEAVE
  client.on("guildDelete", guild => {
    console.log(`LEFT: ${guild.name} - ${guild.id}; ${guildowner.tag} - ${guild.ownerID}; ${guild.memberCount} members; Serving ${client.guilds.cache.size} servers, Serving ${client.users.cache.size} users;`);
  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") {
      console.log(`#DM: @${message.author.tag}: ${message.content}`);
      if(message.content.includes(prefix) && !message.content === `${prefix}apply`) return;
    }

/////////////////////////////////////////////////////////////////////////////////////////////

    db.add(`act.${message.guild.id}.${message.author.id}`, 1);
    
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if(commandfile) commandfile.run(client, message, args);

/////////////////////////////////////////////////////////////////////////////////////////////

  });
 
client.login(process.env.TOKEN);