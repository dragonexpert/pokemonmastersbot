/**
 * This is the main file for the Pokemon Masters Bot
 * Author: Mark Janssen
 */

const Discord = require("discord.js");
const Client = new Discord.Client({partials: ["CHANNEL", "USER"], intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES], messageCacheLifetime: 3600 });
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
    Client.user.setStatus("Prefix: pm!");
    Client.user.setActivity("Prefix: pm!");
    console.log(`Logged in as ${Client.user.tag}!`);
});

Client.login(Config.bot_token);

Client.on('messageCreate', msg => {
let bot_prefix = Config.bot_prefix;
if(msg.content.indexOf(bot_prefix) === 0)
{
    // It is a command
    let auth = 1;
    let message = msg.content.substr(bot_prefix.length);
    let message_parts = message.split(" ");
    let command = message_parts[0];
    let help = false;
    if(message.toLowerCase() === "help")
    {
        auth = getAuth(msg);
        // Retrieve a list of commands.
        let commands = "Commands available: ";
        let comma = "";
        let auth_notice = "";
        let commandFiles = fs.readdirSync("Commands").filter(file => file.endsWith(".js"));
        for(y in commandFiles)
        {
            const command = require("./Commands/" + commandFiles[y]);
            if(command.hasOwnProperty("auth"))
            {
                if(command.auth <= auth)
                {
                    commands += comma + "**" + command.name + "**";
                    comma = ", ";
                    auth_notice = "Commands in bold require elevated permissions.\n";
                }
            }
            else
            {
                commands += comma + command.name;
                comma = ", ";
            }
        }
        return msg.channel.send(auth_notice + commands);
    }
    if(message.startsWith("help"))
    {
        command = message_parts[1];
        help = true;
    }
    let commandInfo = Client.commands.get(command) || Client.commands.find(cmd => cmd.alias && cmd.alias.includes(command));
    if (!commandInfo)
    {
        return;
    }
    try
    {
        if(commandInfo.hasarguments === true && message_parts.length < 2 && help === false)
        {
            return msg.author.send("This command requires a parameter.");
        }
        // Do not override with help because users shouldn't get to see command info they aren't allowed.
        if(commandInfo.hasOwnProperty("auth"))
        {
            if(commandInfo.auth > 1)
            {
                auth = getAuth(msg);
            }
            if(commandInfo.auth > auth)
            {
                return "You do not have permission to use this command.";
            }
        }
        let y = 0, arguments = "", space = "";
        for(x in message_parts)
        {
            if(x !== "0")
            {
                arguments += space + message_parts[x];
                if (y < 1)
                {
                    space = " ";
                }
                ++y;
            }
        }
        let message_content = "";


        if(commandInfo.name === "updatecommand")
        {
            message_content = commandInfo.execute(msg, Client);
        }
        else if(commandInfo.name === "serverlist")
        {
            message_content = commandInfo.execute(msg, Client);
        }
        else if(commandInfo.name === "serverinfo")
        {
            message_content = commandInfo.execute(msg, Client);
        }
        else if(commandInfo.name === "leaveguild")
        {
            message_content = commandInfo.execute(msg, Client);
        }
        else
        {
            if(help === false)
            {
                message_content = commandInfo.execute(msg, arguments);
            }
            else
            {
                message_content = commandInfo.name + "\nDescription: " + commandInfo.description;
            }
        }
        if(message_content)
        {
            if(commandInfo.hasOwnProperty("privateResponse"))
            {
                return msg.author.send(message_content, {split: true});
            }
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

function getAuth(msg)
{
    if(parseInt(msg.author.id) === parseInt(Config.bot_owner))
    {
        return 10;
    }
    try
    {
        const myAuth = require("./auth.json");
        delete require.cache[require.resolve("./auth.json")];
        if (myAuth.moderator.includes(msg.author.id))
        {
            return 3;
        }
        if (myAuth.admin.includes(msg.author.id))
        {
            return 4;
        }
        if (myAuth.owner.includes(msg.author.id))
        {
            return 5;
        }
        return 1;
    }
    catch (Exception)
    {
        console.error(Exception);
        // Return a 1 if it fails because it is better to not let a user have access to a command they might not have permission to use.
        return 1;
    }
}