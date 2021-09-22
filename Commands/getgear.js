const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "getgear",
    "description": "View what stage gives a gear.",
    "hasarguments": true,
    "alias": "findgear",
    "execute": (msg, args) =>
    {
        let gearData = fs.readdirSync("Gear").filter(file => file.endsWith(".json"));
        msg.gears = new Discord.Collection();
        for (x in gearData)
        {
            const gear = require("../Gear/" + gearData[x]);
            msg.gears.set(gear.name, gear);
        }
        let splitter = msg.content.split(" ");
        try
        {
            let gearInfo = msg.gears.get(splitter[1].toLowerCase());
            if (!gearInfo)
            {
                return "No data for gear: " + splitter[1];
            }
            return splitter[1].substring(0, 1).toUpperCase() + splitter[1].substring(1).toLowerCase() + " can be found in these stages: " + gearInfo.stages.toString();
        }
        catch (Exception)
        {
            console.error(Exception);
            return "An exception occured. " + Exception;
        }
    }
}