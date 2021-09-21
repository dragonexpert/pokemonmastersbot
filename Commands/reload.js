const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "reload",
    "description": "Reloads the Sync Pair Cache.  Required when edits are made to current sync pairs.",
    "hasarguments": false,
    "alias": "resync",
    "auth": 2,
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        let legendPairData = fs.readdirSync("LegendaryArena").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        msg.legendaryArena = new Discord.Collection();
        try
        {
            for (x in syncPairData)
            {
                delete require.cache[require.resolve("../SyncPairs/" + syncPairData[x])];
                const syncpair = require("../SyncPairs/" + syncPairData[x]);
                msg.syncPairs.set(syncpair.name, syncpair);
            }
            for (y in legendPairData)
            {
                delete require.cache[require.resolve("../LegendaryArena/" + legendPairData[y])];
                const legendaryPair = require("../LegendaryArena/" + legendPairData[y]);
                msg.legendaryArena.set(legendaryPair.name, legendaryPair);
            }
            delete require.cache[require.resolve("../Passives/passives.json")];
        }
        catch (e)
        {
            return "There was an error reloading the sync pairs.";
        }
        return "The sync pair roster has been updated.";
    }
}