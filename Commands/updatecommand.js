const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "updatecommand",
    "description": "Reloads the Sync Pair Cache.  Required when edits are made to current sync pairs.",
    "hasarguments": true,
    "alias": "reloadcommand",
    "auth": 3,
    "execute": (msg, Client) =>
    {
        try
        {
            let splitter = msg.content.split(" ");
            delete require.cache[require.resolve("./" + splitter[1] + ".js")];
            const command = require("./" + splitter[1] + ".js");
            Client.commands.set(command.name, command);
            return "Reloaded the command successfully.";
        }
        catch (Exception)
        {
            console.error(Exception);
            return "There was an error reloading the command.\n" + Exception;
        }
    }
}