const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "exstage",
    "description": "View what stage gives a gear.",
    "hasarguments": true,
    "alias": "stageex",
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
            // Reformat the argument to make sure it is proper.
            let stageName = splitter[1].substring(0, 1).toUpperCase() + splitter[1].substring(1).toLowerCase() + " EX";
            let stageInfo = msg.gears.filter(user => user.stages.includes(stageName));
            if (stageInfo.size === 0)
            {
                return "No data for stage: " + stageName;
            }
            let comma = "";
            let output = "";
            stageInfo.each(data =>
            {
                output += comma + data.name.substring(0, 1).toUpperCase() + data.name.substring(1).toLowerCase();
                comma = ", ";
            });
            return stageName + " can drop the following types of gear: " + output;
        }
        catch (Exception)
        {
            console.error(Exception);
            return "An exception occurred. " + Exception;
        }
    }
}