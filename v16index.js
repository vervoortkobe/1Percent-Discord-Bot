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
const client = new Discord.Client({ allowedMentions: { parse: ["users", "roles"], repliedUser: true }, intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const prefix = process.env.PREFIX;
const fetch = require("node-fetch");
const db = require("quick.db");
const moment = require("moment");

  client.on("ready", async () => {

    console.log("\x1b[0m", "");
    console.log("\x1b[36m", `» Serving ${client.guilds.cache.size} servers!`);
    console.log("\x1b[36m", `${client.guilds.cache.forEach(server => console.log(server.name))}`);
    console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
    console.log("\x1b[0m", "");

    client.user.setActivity(`${process.env.PREFIX}help | ${client.user.username}`, {type: "PLAYING"});
  });

  setTimeout(() => {
    client.users.fetch("424253425451139082").then(user => {
      if(user.presence.status && user.presence.status === "online" || 
         user.presence.status && user.presence.status === "idle" || 
         user.presence.status && user.presence.status === "dnd"
        ) 
      client.channels.cache.get("856924466981240852").send({ content: "<@424253425451139082> is currently active on Discord!" });
    });
  }, 5 * 60 * 1000); //300000ms = 5min
 
client.login(process.env.TOKEN);