const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "events",
    "description": "View current and upcoming events.",
    "hasarguments": false,
    "alias": "upcomingevents",
    "execute": (msg, args) =>
    {
        let eventData = fs.readdirSync("Events").filter(file => file.endsWith(".json"));
        msg.eventData = new Discord.Collection();
        let message = "Events:";
        let y = 1;
        for (x in eventData)
        {
            const event = require("../Events/" + eventData[x]);
            // Ensure it is treated as an integer.
            event.eventstart = parseInt(event.eventstart);
            event.eventend = parseInt(event.eventend);
            msg.eventData.set(event.name, event);
        }
        msg.eventData.sort(module.exports.sort_collection);
        let current_time = Date.now() / 1000;
        msg.eventData.each( data => {
            message += module.exports.format_output(data, y);
            if(data.eventend > current_time)
            {
                ++y;
            }
        })

        return message;
    },
    "sort_collection": (v1, v2) =>
    {
        let sortby = "eventstart";
        let field2 = "eventend";
        if(v1[sortby] < v2[sortby])
        {
            return -1;
        }
        if(v1[sortby] > v2[sortby])
        {
            return 1;
        }
        if(v1[sortby === v2[sortby]])
        {
            // compare end date
            if(v1[field2] > v2[field2])
            {
                return 1;
            }
            return -1;
        }
        return 0;
    },
    "format_output": (data, y) =>
    {
        let formatted_output = "";
        const current_time = Date.now() / 1000;
        if(data.eventend < current_time)
        {
            return formatted_output;
        }
        formatted_output += "\n" + y + ") " + data.nicename;
        if(data.eventstart > current_time)
        {
            let reset_count = Math.ceil((data.eventstart - current_time) / 86400);
            formatted_output += "\t- Starts in " + reset_count + " Resets";
        }
        else
        {
            let reset_count = Math.ceil((data.eventend - current_time) / 86400);
            formatted_output += "\t- Ends in " + reset_count + " Resets";
        }
        return formatted_output;
    }
}