/**
 * This is the main file for the Pokemon Masters Bot
 * Author: Mark Janssen
 */

const Discord = require("discord.js");
const Client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES], messageCacheLifetime: 3600 });
const Config = require("./config.json");
const fs = require("fs");
Client.commands = new Discord.Collection();
let commandFiles = fs.readdirSync("Commands").filter(file => file.endsWith(".js"));
for(y in commandFiles)
{
    const command = require("./Commands/" + commandFiles[y]);
    Client.commands.set(command.name, command);
}


Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});

Client.login(Config.bot_token);

Client.on('messageCreate', msg => {
let bot_prefix = Config.bot_prefix;
if(msg.content.indexOf(bot_prefix) === 0)
{
    // It is a command
    let message = msg.content.substr(bot_prefix.length);
    let message_parts = message.split(" ");
    let command = message_parts[0];
    let commandInfo = Client.commands.get(command) || Client.commands.find(cmd => cmd.alias && cmd.alias.includes(command));
    if (!commandInfo)
    {
        return msg.author.send("That command does not exist.  If it is a guild specific command, help must be called in the appropriate guild.");
    }
    try
    {
        if(commandInfo.hasarguments === true && message_parts.length < 2)
        {
            return msg.author.send("This command requires a parameter.");
        }
        let y = 0, arguments = "", space = "";
        for(x in message_parts)
        {
            if(x !== 0)
            {
                arguments += space + message_parts[x];
                if (y < 1)
                {
                    space = " ";
                }
                ++y;
            }
        }
        let message_content = commandInfo.execute(msg, arguments);
        if(message_content)
        {
            return msg.channel.send(message_content, {split: true});
        }
    }
    catch (e)
    {
        console.log(e);
        return msg.author.send("There was an error processing the command.\n");
    }
}
});