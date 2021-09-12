const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "la",
    "description": "View a Legendary Arena Boss",
    "hasarguments": true,
    "alias": "legendaryarena",
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("LegendaryArena").filter(file => file.endsWith(".json"));
        msg.legendaryArena = new Discord.Collection();
        for (x in syncPairData)
        {
            const la_boss = require("../LegendaryArena/" + syncPairData[x]);
            msg.legendaryArena.set(la_boss.name, la_boss);
        }
        let command = args.replace("la ", "").toLowerCase();
        let commandInfo = msg.legendaryArena.get(command) || msg.legendaryArena.find(cmd => cmd.alias && cmd.alias.includes(command));
        if (!commandInfo)
        {
            return "No data found for " + args + ".";
        }
        return module.exports.format_output(commandInfo);
    },
    "format_output": (data) =>
    {
        let output_string = "Name: " + data.name + "\n";
        output_string += "Weakness: " + data.weakness + "\n";
        // Normally 3 bars, but this way it can be future proof.
        output_string += "HP Bars: " + data.hpbars + "\n";
        if(data.hasallies)
        {
            output_string += data.name + " has allies.\n";
        }
        else
        {
            output_string += data.name + " does not have allies.\n";
        }
        output_string += "Strategy: " + data.strategy + "\n";
        output_string += "F2P Options: " + data.f2p + "\n";
        output_string += "Best Options: " + data.best;
        // Mainly for Youtube Videos
        if(data.hasOwnProperty("video"))
        {
            output_string += "\n" + data.video;
        }
        // Mostly for Reddit Guides that are in depth.
        if(data.hasOwnProperty("detailedguide"))
        {
            output_string += "\n" + data.detailedguide;
        }
        return output_string;
    }
}