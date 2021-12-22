const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "reload",
    "description": "Reloads the Sync Pair Cache.  Required when edits are made to current sync pairs. If data seems off, try this command.",
    "hasarguments": false,
    "alias": "resync",
    "auth": 3,
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        let legendPairData = fs.readdirSync("LegendaryArena").filter(file => file.endsWith(".json"));
        let eventData = fs.readdirSync("Events").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        msg.legendaryArena = new Discord.Collection();
        msg.eventData = new Discord.Collection();
        try
        {
            for (x in syncPairData)
            {

                delete require.cache[require.resolve("../SyncPairs/" + syncPairData[x])];
                const syncpair = require("../SyncPairs/" + syncPairData[x]);
                msg.syncPairs.set(syncpair.name, syncpair);
            }
            msg.channel.send("Sync pair cache reloaded.");
        }
        catch(Exception)
        {
            console.error(Exception);
            msg.channel.send("There was an error reloading the sync pair cache.\n" + Exception);
        }
        try
        {
            for (y in legendPairData)
            {
                    delete require.cache[require.resolve("../LegendaryArena/" + legendPairData[y])];
                    const legendaryPair = require("../LegendaryArena/" + legendPairData[y]);
                    msg.legendaryArena.set(legendaryPair.name, legendaryPair);
            }
            msg.channel.send("Legendary Arena cache reloaded.");
        }
        catch (Exception)
        {
            console.error(Exception);
            msg.channel.send("There was an error reloading the Legendary Arena cache.\n" + Exception);
        }
        try
        {
            for (z in eventData)
            {

                    delete require.cache[require.resolve("../Events/" + eventData[z])];
                    const event = require("../Events/" + eventData[z]);
                    msg.eventData.set(event.name, event);
            }
            msg.channel.send("Event cache reloaded.");
        }
        catch (Exception)
        {
            console.error(Exception);
            msg.channel.send("There was an error reloading the Event cache.\n" + Exception);
        }
        try
        {
            delete require.cache[require.resolve("../Passives/passives.json")];
            const passives = require("../Passives/passives.json");
            delete require.cache[require.resolve("../Passives/cookies.json")];
            const cookies = require("../Passives/cookies.json");
            msg.channel.send("Passives and Lucky Skills cache reloaded.");
        }
        catch (Exception)
        {
            console.error(Exception);
            msg.channel.send("There was an error reloading the passives cache.\n" + Exception);
        }
        try
        {
            delete require.cache[require.resolve("../Moves/moves.json")];
            const movedata = require("../Moves/moves.json");
            delete require.cache[require.resolve("../Moves/tms.json")];
            const tmdata = require("../Moves/tms.json");
        }
        catch (Exception)
        {
            console.error(Exception);
            msg.channel.send("There was an error reloading the move cache.\n" + Exception);
        }
        return "Finished reloading all caches.";
    }
}