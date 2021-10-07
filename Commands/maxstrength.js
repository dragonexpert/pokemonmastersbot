const Discord = require("discord.js");
const fs = require("fs");
const Config = require("../config.json");

module.exports = {
    "name": "maxstrength",
    "description": "View a sync pair",
    "hasarguments": false,
    "alias": "collectivestrength",
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        let collective_strength = 0;
        msg.syncPairs = new Discord.Collection();
        let stars = 5;
        for (x in syncPairData)
        {
            const syncpair = require("../SyncPairs/" + syncPairData[x]);
            if(!syncpair.alias.startsWith("mega"))
            {
                // Figure out the star level
                stars = 5;
                if (syncpair.hasOwnProperty("stars"))
                {
                    stars = syncpair.stars;
                }

                syncpair.hp = parseInt(syncpair.hp);
                syncpair.atk = parseInt(syncpair.atk);
                syncpair.def = parseInt(syncpair.def);
                syncpair.spatk = parseInt(syncpair.spatk);
                syncpair.spdef = parseInt(syncpair.spdef);
                syncpair.speed = parseInt(syncpair.speed);

                if (stars === 5)
                {
                    syncpair.maxhp = syncpair.hp + 100;
                    syncpair.maxatk = syncpair.atk + 40;
                    syncpair.maxdef = syncpair.def + 40;
                    syncpair.maxspatk = syncpair.spatk + 40;
                    syncpair.maxspdef = syncpair.spdef + 40;
                    syncpair.maxspeed = syncpair.speed + 40;
                }
                else
                {
                    let bonus = 5 - stars;
                    // Use parenthesis to ensure consistent behavior.
                    syncpair.maxhp = syncpair.hp + (bonus * 40);
                    syncpair.maxatk = syncpair.atk + (bonus * 20);
                    syncpair.maxdef = syncpair.def + (bonus * 20);
                    syncpair.maxspatk = syncpair.spatk + (bonus * 20);
                    syncpair.maxspdef = syncpair.spdef + (bonus * 20);
                    syncpair.maxspeed = syncpair.speed + (bonus * 20);
                }

                // Now all stats are calculated so update the collective strength
                collective_strength += module.exports.calculate_strength_max(syncpair);

                msg.syncPairs.set(syncpair.name, syncpair);
            }
        }
        // All the normal pairs are done, now deal with the egg stats
        let egg = {};
        egg.maxhp = 584;
        egg.maxatk = 350;
        egg.maxdef = 164;
        egg.maxspatk = 350;
        egg.maxspdef = 164;
        egg.maxspeed = 296;
        let egg_strength = module.exports.calculate_strength_max(egg);
        collective_strength += ( egg_strength * 46);
        return "The maximum collective strength is " + Intl.NumberFormat("en-US").format(collective_strength);
    },
    "calculate_strength_max": (data) =>
    {
        let strength = (data.maxhp * 4) + (data.maxatk * 6) + (data.maxdef * 4) + (data.maxspatk * 6) + (data.maxspdef * 4) + (data.maxspeed * 6);
        if (strength % 5 === 5 || strength % 5 === 0)
        {
            return strength;
        }
        else
        {
            return strength - (strength % 5);
        }
    }
}