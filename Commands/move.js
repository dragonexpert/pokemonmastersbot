const Discord = require("discord.js");
module.exports = {
    "name": "move",
    "description": "View a move",
    "hasarguments": true,
    "alias": "attack",
    "execute": (msg, args) =>
    {
        const movedata = require("../Moves/moves.json");
        delete require.cache[require.resolve("../Moves/moves.json")];
        msg.moveData = new Discord.Collection();
        for (x in movedata)
        {
            const info = movedata[x];
            msg.moveData.set(info.name, info);
        }
        let splitter = args.split(" ");
        let keyword = "";
        let space = "";
        // Format the code properly
        for (y in splitter)
        {
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
        return module.exports.format_output(moveinfo);
    },
    "format_output": (data) =>
    {
        let message = "Data for " + data.name;
        message += "\nType: " + data.type;
        message += "\nCategory: " + data.category;
        if(data.category !== "Other")
        {
            message += "\nMax Power: " + data.power;
        }
        message += "\nMove Slots: " + data.move_slots;
        message += "\nTarget: " + data.target;
        message += "\nDescription: " + data.description;
        return message;
    }
}