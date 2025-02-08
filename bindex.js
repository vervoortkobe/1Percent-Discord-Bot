const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.get("/pokemon/", (req, res) => {

  const pokemon = require("./pokemon.json");

  var t1 = new Date(pokemon["839050532915380254"].countdown);
  var t2 = t1.setSeconds(t1.getSeconds() + 300);
  var dif = new Date(t2).getTime() - Date.now();

  var Seconds_from_T1_to_T2 = dif / 1000;
  var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2).toFixed(2);

  res.send(`<b>Pokémon:</b><br>
  ${pokemon["839050532915380254"].pokemon}<br><br>
  <b>Guessed?:</b><br>
  ${pokemon["839050532915380254"].guessed}<br><br>
  <b>Countdown:</b><br>
  ${Seconds_Between_Dates} seconds before a Pokémon spawns<br><br>
  <b>A Pokémon spawns every 5 min</b>
  `);

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
      console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
      console.log("\x1b[0m", "");

    });
    client.user.setActivity(`${process.env.PREFIX}help | ${client.user.username}`, {type: "PLAYING"});

    setInterval(() => {
      pokespawn();
    }, 300000);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//POKEMON
  async function pokespawn() {
    let spawnchan = client.channels.cache.get("839050532915380254");
    if(!spawnchan) console.log("no spawnchan found!");

    let pokelist = require("./pokelist.json");
    let result = Math.floor((Math.random() * pokelist.length));

    const pokemon = require("./pokemon.json");
    if(!pokemon[spawnchan.id]) {
      pokemon[spawnchan.id] = {
        "pokemon": "pikachu",
        "guessed": true,
        "countdown": 0
      }
    }

    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokelist[result]}`);
    let json = await res.json();

    let pokePic = new Discord.MessageAttachment(json.sprites.front_default, "pokemon.png");

    let hint;
    if(pokelist[result].length === 1) hint = `\`${pokelist[result].charAt(0)}\``;
    if(pokelist[result].length === 2) hint = `\`${pokelist[result].charAt(0)}\` \`.\``;
    if(pokelist[result].length === 3) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\``;
    if(pokelist[result].length === 4) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`.\``;
    if(pokelist[result].lenght === 5) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 6) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\``;
    if(pokelist[result].length === 7) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 8) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 9) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 10) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`${pokelist[result].charAt(7)}\` \`.\` \`.\``;
    if(pokelist[result].length === 11) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`${pokelist[result].charAt(7)}\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 12) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`${pokelist[result].charAt(7)}\` \`.\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 13) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`${pokelist[result].charAt(7)}\` \`.\` \`.\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 14) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`${pokelist[result].charAt(7)}\` \`.\` \`.\` \`.\` \`.\` \`.\` \`.\``;
    if(pokelist[result].length === 15) hint = `\`${pokelist[result].charAt(0)}\` \`.\` \`.\` \`${pokelist[result].charAt(3)}\` \`.\` \`.\` \`.\` \`${pokelist[result].charAt(7)}\` \`.\` \`.\` \`.\` \`.\` \`.\` \`.\` \`.\``;

    const pokespawnEmbed = new Discord.MessageEmbed()
    .setColor(0x000)
    .setTitle("Pokémon Spawned!")
    .setDescription(`» Do you know the name of this Pokémon?
    \n» Type its correct name to get \`10\` xp!
    \n» Hint: ${hint}
    `)
    .attachFiles(pokePic)
    .setImage("attachment://pokemon.png")
    .setFooter(`A Pokémon spawns every 5 min`)
    await spawnchan.send(pokespawnEmbed)
    .then(m => {
      pokemon[spawnchan.id] = {
        "pokemon": pokelist[result],
        "guessed": false,
        "countdown": m.createdTimestamp
      }

      fs.writeFile("./pokemon.json", JSON.stringify(pokemon), err => {
        if(err) console.log(err);
      });
    });
  }

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") {
      console.log(`#DM: @${message.author.tag}: ${message.content}`);
      if(message.content.includes(prefix) && !message.content === `${prefix}apply`) return;
    }

/////////////////////////////////////////////////////////////////////////////////////////////
//POKEMON GUESS

    if(message.channel.id === "839050532915380254") {
      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);

      const pokemon = require("./pokemon.json");
      if(!pokemon["839050532915380254"]) {
        pokemon["839050532915380254"] = {
          "pokemon": "pikachu",
          "guessed": false
        }
      }

      let confirm = client.emojis.cache.get("838082677177057370");
      let cancel = client.emojis.cache.get("838082687624675328");

      if(!args[0] && !message.content.startsWith(prefix) && pokemon["839050532915380254"].guessed === false) {
        if(message.content.toLowerCase() === pokemon["839050532915380254"].pokemon) {
          message.react(`${confirm}`);

          if(pokemon["839050532915380254"].guessed === false) {
            pokemon["839050532915380254"].guessed =
            true;

            fs.writeFile("./pokemon.json", JSON.stringify(pokemon), err => {
              if(err) console.log(err);
            });


            db.add(`act.${message.guild.id}.${message.author.id}`, 10);
            
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon["839050532915380254"].pokemon}`);
            let json = await res.json();

            let pokePic = new Discord.MessageAttachment(json.sprites.front_default, "pokemon.png");


            const correct = new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setTitle(`Pokémon Guessed!`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`${confirm} **${message.author}** guessed the Pokémon's name correctly and received \`10\` xp!
            \n» This Pokémon is a \`${pokemon["839050532915380254"].pokemon}\`!
            `)
            .setThumbnail("attachment://pokemon.png")
            .attachFiles(pokePic)
            .setFooter(`A Pokémon spawns every 5 min`)
            message.channel.send(correct);
          } else {
            return message.channel.send(`> ${cancel} Someone already guessed this Pokémon's name!`);
          }
        } else {
          message.react(`${cancel}`);
        }
      }
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