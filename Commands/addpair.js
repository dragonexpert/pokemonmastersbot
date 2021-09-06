const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "addpair",
    "description": "Adds a sync pair.",
    "hasarguments": true,
    "alias": "addsyncpair",
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        let command = args.replace("addpair ", "").toLowerCase();
        try
        {
            for (x in syncPairData)
            {
                delete require.cache[require.resolve("../SyncPairs/" + syncPairData[x])];
                const syncpair = require("../SyncPairs/" + syncPairData[x]);
                msg.syncPairs.set(syncpair.name, syncpair);
            }
        }
        catch (e)
        {
            return "There was an error reloading the sync pairs.";
        }
        return "The sync pair roster has been updated.";
    }
}