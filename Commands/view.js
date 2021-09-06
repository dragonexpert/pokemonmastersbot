const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "view",
    "description": "View a sync pair",
    "hasarguments": true,
    "alias": "syncpair",
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        for(x in syncPairData)
        {
            const syncpair = require("../SyncPairs/" + syncPairData[x]);
            msg.syncPairs.set(syncpair.name, syncpair);
        }
        let command = args.replace("view ", "").toLowerCase();
        let commandInfo = msg.syncPairs.get(command) || msg.syncPairs.find(cmd => cmd.alias && cmd.alias.includes(command));
        if(!commandInfo)
        {
            return "No data found for " + args + ".";
        }
        return module.exports.format_output(commandInfo);
    },
    "format_output": (data) =>
    {
        let output = "Stats for " + data.name + " & " + data.pokemon + "\n";
        output += "Type: " + data.type + "\n";
        output += "Attack Types: " + data.attacktypes + "\n";
        output += "Weakness: " + data.weakness + "\n";
        output += "Role: " + data.role + "\n";
        output += "HP: " + data.hp + "\t\tSpAtk: " + data.spatk + "\n";
        output += "Atk: " + data.atk + "\t\tSpDef: " + data.spdef + "\n";
        output += "Def: " + data.def + "\t\tSpeed: " + data.speed + "\n";
        output += "Moves: " + data.moves + "\n";
        if(data.ex === true)
        {
            output += "This sync pair is capable of EX.\n";
        }
        if(data.mega !== false)
        {
            output += "This Pokemon is capable of mega evolution.\n";
        }
        if(data.dynamax !== false)
        {
            output += "This Pokemon has a max move.\n";
        }
        if(data.pokefair === true)
        {
            output += "This sync pair is Poke Fair exclusive.\n";
        }
        if(data.masterfair === true)
        {
            output += "This sync pair is a master sync pair.\n";
        }
        if(data.f2p === true)
        {
            output += "This sync pair is obtained via story mode or an event.";
        }
        return output;
    }
}
