const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "top",
    "description": "Displays the top 10 sync pairs for the given stat",
    "hasarguments": true,
    "alias": "searchtop",
    "execute": (msg, args) =>
    {
        // Do they have a valid sort field?
        let valid = ["hp", "atk", "def", "spatk", "spdef", "speed"];
        let splitter = msg.content.split(" ");
        if(!valid.includes(splitter[1].toLowerCase()))
        {
            return "Invalid sort field.  Valid fields are: hp, atk, def, spatk, spdef, speed";
        }
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        for (x in syncPairData)
        {
            const syncpair = require("../SyncPairs/" + syncPairData[x]);
            // Make sure these are integers for proper sorting
            syncpair.hp = parseInt(syncpair.hp);
            syncpair.atk = parseInt(syncpair.atk);
            syncpair.def = parseInt(syncpair.def);
            syncpair.spatk = parseInt(syncpair.spatk);
            syncpair.spdef = parseInt(syncpair.spdef);
            syncpair.speed = parseInt(syncpair.speed);
            msg.syncPairs.set(syncpair.name, syncpair);
        }
        switch (splitter[1].toLowerCase())
        {
            case "hp":
                msg.syncPairs.sort(module.exports.sort_collection_hp);
                break;
            case "atk":
                msg.syncPairs.sort(module.exports.sort_collection_atk);
                break;
            case "def":
                msg.syncPairs.sort(module.exports.sort_collection_def);
                break;
            case "spatk":
                msg.syncPairs.sort(module.exports.sort_collection_spatk);
                break;
            case "spdef":
                msg.syncPairs.sort(module.exports.sort_collection_spdef);
                break;
            case "speed":
                msg.syncPairs.sort(module.exports.sort_collection_speed);
                break;
            default:
                return "Invalid sort field.  Valid fields are: hp, atk, def, spatk, spdef, speed";
        }
        let y = 1;
        let message = "Top 10 Sync Pairs for stat " + splitter[1].toLowerCase();
        msg.syncPairs.each(data => {
            if(y > 10)
            {
                return message;
            }
            message += module.exports.format_output(data, splitter[1].toLowerCase(), y);
            ++y;
        });
        return message;
    },
    "format_output":(data, stat, y) =>
    {
        let output = "\n" + y + ") " + data.nicename + ": ";
        if(stat === "hp")
        {
            output += data.hp;
        }
        else if(stat === "atk")
        {
            output += data.atk;
        }
        else if(stat === "def")
        {
            output += data.def;
        }
        else if(stat === "spatk")
        {
            output += data.spatk;
        }
        else if(stat === "spdef")
        {
            output += data.spdef;
        }
        else if(stat === "speed")
        {
            output += data.speed;
        }
        else
        {
            return "Unsupported sort field.";
        }
        return output;
    },
    "sort_collection_hp":(v1, v2) =>
    {
        let sortfield = "hp";
        if(v1[sortfield] > v2[sortfield])
        {
            return -1;
        }
        if(v1[sortfield] < v2[sortfield])
        {
            return 1;
        }
        return 0;
    },
    "sort_collection_atk":(v1, v2) =>
    {
        let sortfield = "atk";
        if(v1[sortfield] > v2[sortfield])
        {
            return -1;
        }
        if(v1[sortfield] < v2[sortfield])
        {
            return 1;
        }
        return 0;
    },
    "sort_collection_def":(v1, v2) =>
    {
        let sortfield = "def";
        if(v1[sortfield] > v2[sortfield])
        {
            return -1;
        }
        if(v1[sortfield] < v2[sortfield])
        {
            return 1;
        }
        return 0;
    },
    "sort_collection_spatk":(v1, v2) =>
    {
        let sortfield = "spatk";
        if(v1[sortfield] > v2[sortfield])
        {
            return -1;
        }
        if(v1[sortfield] < v2[sortfield])
        {
            return 1;
        }
        return 0;
    },
    "sort_collection_spdef":(v1, v2) =>
    {
        let sortfield = "spdef";
        if(v1[sortfield] > v2[sortfield])
        {
            return -1;
        }
        if(v1[sortfield] < v2[sortfield])
        {
            return 1;
        }
        return 0;
    },
    "sort_collection_speed":(v1, v2) =>
    {
        let sortfield = "speed";
        if(v1[sortfield] > v2[sortfield])
        {
            return -1;
        }
        if(v1[sortfield] < v2[sortfield])
        {
            return 1;
        }
        return 0;
    }
}