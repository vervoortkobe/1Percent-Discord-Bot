const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

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

const axios = require("axios");
const cheerio = require("cheerio");

client.on("ready", async () => {

  console.log("\x1b[0m", "");
  console.log("\x1b[36m", `» Serving ${client.guilds.cache.size} servers!`);
  client.guilds.cache.forEach(server => console.log("\x1b[36m", `\t- ${server.name}`));
  console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
  console.log("\x1b[0m", "");

  client.user.setActivity(`Asphalt9 in 1% Community`, {type: "PLAYING"});

  let latestTweet = "";
    
  async function checkForNewTweets() {
    try {
      const res = await axios.get("https://twitter.com/ESLAsphalt");
      const $ = cheerio.load(res.data);
  
      const newTweet = $('.tweet').first().text();
  
      //checker
      if(newTweet === latestTweet) return;
      else {
        latestTweet = newTweet;
        console.log(newTweet);
        
        client.guilds.cache.get("585569252094902292")
          .channels.cache.get("849748987446951996")
          .send({ content: newTweet });
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  setInterval(checkForNewTweets, 60 * 1000 * 10);
});
 
client.login(process.env.TOKEN);