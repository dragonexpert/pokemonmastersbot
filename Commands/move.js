const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "move",
    "description": "View a move",
    "hasarguments": true,
    "alias": "attack",
    "execute": (msg, args) =>
    {
        const movedata = require("../Moves/moves.json");
        const tmdata = require("../Moves/tms.json");
        delete require.cache[require.resolve("../Moves/moves.json")];
        msg.moveData = new Discord.Collection();
        for (x in movedata)
        {
            const info = movedata[x];
            msg.moveData.set(info.name, info);
        }
        for (y in tmdata)
        {
            const tminfo = tmdata[y];
            msg.moveData.set(tminfo.name, tminfo);
        }
        let splitter = args.split(" ");
        let keyword = "";
        let space = "";
        // Format the code properly
        for (y in splitter)
        {
            splitter[y] = splitter[y].replace("!", "");
            splitter[y] = splitter[y].replace("'", "");
            splitter[y] = splitter[y].replace("...", "");
            keyword += space + splitter[y].substring(0, 1).toUpperCase() + splitter[y].substring(1).toLowerCase();
            space = " ";
        }
        let moveinfo = msg.moveData.get(args);
        if(!moveinfo)
        {
            // No exact match, try a partial match fallback
            moveinfo = msg.moveData.find(user => user.name.includes(keyword));
            if(!moveinfo)
            {
                return "No data found for move: '" + args + "'";
            }
        }
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        for (x in syncPairData)
        {
            const syncpair = require("../SyncPairs/" + syncPairData[x]);
            msg.syncPairs.set(syncpair.name, syncpair);
        }
        let syncpairs = msg.syncPairs.filter(user => user.moves.includes(keyword));
        if(syncpairs.size === 0)
        {
            return module.exports.format_output(moveinfo);
        }
        let output = "The following sync pairs can learn this move: ";
        let comma = "";
        syncpairs.each(data =>
        {
            output += comma + data.nicename;
            comma = ", ";
        });
        let move_output = module.exports.format_output(moveinfo);
        return move_output + "\n" + output;
    },
    "format_output": (data) =>
    {
        let message = "Data for " + data.name;
        if(data.hasOwnProperty("type"))
        {
            // Battle Move
            message += "\nType: " + data.type;
            message += "\nCategory: " + data.category;
            if (data.category !== "Other")
            {
                message += "\nMax Power: " + data.power;
            }
            message += "\nMove Slots: " + data.move_slots;
            message += "\nTarget: " + data.target;
            message += "\nDescription: " + data.description;
            return message;
        }
        else
        {
            // TM Move
            message += "\nUses: " + data.uses;
            message += "\nTarget: " + data.target;
            message += "\nDescription: " + data.description;
            return message;
        }
    }
}