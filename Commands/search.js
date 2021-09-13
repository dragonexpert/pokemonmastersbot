const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "search",
    "description": "Searches the sync pair roster.  Supported types: type[space]TypeHere, pokefair, masterfair, f2p, mega, dynamax, ex.",
    "hasarguments": true,
    "alias": "searchsync",
    "execute": (msg, args) =>
    {

        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        for (x in syncPairData)
        {
            const syncpair = require("../SyncPairs/" + syncPairData[x]);
            msg.syncPairs.set(syncpair.name, syncpair);
        }
        // First determine what we are searching for.

        splitter = msg.content.split(" ");
        search_criteria = splitter[1].toLowerCase();
        if(search_criteria === "type")
        {
            let comma = "";
            // The next 3 lines fix how type is capitalized.
            let string1 = splitter[2].substring(0, 1).toUpperCase();
            let string2 = splitter[2].substring(1).toLowerCase();
            let type = string1 + string2;
            let syncpairs = msg.syncPairs.filter(user => user.type === type);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            return output;
        }
        else if(search_criteria === "pokefair")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.pokefair === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            return output;
        }
        else if(search_criteria === "masterfair" || search_criteria === "master")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.masterfair === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            return output;
        }
        else if(search_criteria === "mega")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.mega === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            return output;
        }
        else if(search_criteria === "ex")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.ex === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            msg.author.send(output, {split: true});
            return "The result has been sent via DM.";
        }
        else if(search_criteria === "f2p")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.f2p === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            return output;
        }
        else if(search_criteria === "dynamax")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.dynamax === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                output += comma + data.nicename;
                comma = ", ";
            });
            return output;
        }
        else
        {
            return "The search type you are trying is not supported.  Supported filters: type[space]ThisType, pokefair, masterfair, f2p, mega, dynamax, ex. " +
                "Note that if you use EX, the result will be DM'd regardless of if it was in a guild channel due to it being a lengthy result."
        }
    }
}