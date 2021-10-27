const Discord = require("discord.js");
const fs = require("fs");
const Config = require("../config.json");

module.exports = {
    "name": "view",
    "description": "View a sync pair",
    "hasarguments": true,
    "alias": "syncpair",
    "execute": (msg, args) =>
    {
        let syncPairData = fs.readdirSync("SyncPairs").filter(file => file.endsWith(".json"));
        msg.syncPairs = new Discord.Collection();
        for(x in syncPairData)
        {
            const syncpair = require("../SyncPairs/" + syncPairData[x]);
            msg.syncPairs.set(syncpair.name, syncpair);
        }
        let command = args.replace("view ", "").toLowerCase();
        if(command.toLowerCase().startsWith("sygna suit"))
        {
            let parts = command.split(" ");
            command = "ss" + parts[2];
        }
        if(command.toLowerCase().startsWith("seasonal "))
        {
            let parts = command.split(" ");
            command = "s" + parts[1];
        }
        let commandInfo = msg.syncPairs.get(command);
        if(!commandInfo)
        {
            // Avoid loading a mega by mistake when it doesn't start with mega.
            commandInfo = msg.syncPairs.find(cmd => cmd.alias && cmd.alias.includes(command) && !cmd.alias.startsWith("mega"));
            if(!commandInfo)
            {
                commandInfo = msg.syncPairs.find(cmd => cmd.alias && cmd.alias.includes(command));
                if(!commandInfo)
                {
                    return "No data found for " + args + ".";
                }
            }
        }
        return module.exports.format_output(commandInfo);
    },
    "format_output": (data) =>
    {
        if(!data.hasOwnProperty("nicename"))
        {
            data.nicename = data.name + " & " + data.pokemon;
        }
        if(!data.hasOwnProperty("hp"))
        {
            data.hp = 0;
        }
        if(!data.hasOwnProperty("atk"))
        {
            data.atk = 0;
        }
        if(!data.hasOwnProperty("def"))
        {
            data.def = 0;
        }
        if(!data.hasOwnProperty("spatk"))
        {
            data.spatk = 0;
        }
        if(!data.hasOwnProperty("spdef"))
        {
            data.spdef = 0;
        }
        if(!data.hasOwnProperty("speed"))
        {
            data.speed = 0;
        }
        let output = "Stats for " + data.nicename + "\n";
        output += "Type: " + data.type + "\n";
        output += "Attack Types: " + data.attacktypes + "\n";
        output += "Weakness: " + data.weakness + "\n";
        output += "Role: " + data.role + "\n";
        output += "HP: " + Intl.NumberFormat("en-US").format(data.hp) + "\t\tSpAtk: " + Intl.NumberFormat("en-US").format(data.spatk) + "\n";
        output += "Atk: " + Intl.NumberFormat("en-US").format(data.atk) + "\t\tSpDef: " + Intl.NumberFormat("en-US").format(data.spdef) + "\n";
        output += "Def: " + Intl.NumberFormat("en-US").format(data.def) + "\t\tSpeed: " + Intl.NumberFormat("en-US").format(data.speed) + "\n";
        output += "Moves: " + data.moves + "\n";
        output += "Passives: " + data.passives + "\n";
        if(data.ex === true)
        {
            output += "This sync pair is capable of EX.\n";
        }
        if(data.mega !== false)
        {
            if(!data.alias.startsWith("mega"))
            {
                output += "This Pokemon is capable of mega evolution.  To view the mega stats, type " + Config.bot_prefix + "view mega" + data.pokemon.toLowerCase() + "\n";
            }
            else
            {
                output += "This Pokemon is mega evolved.";
            }
        }
        if(data.dynamax !== false)
        {
            output += "This Pokemon has a max move.\n";
        }
        if(data.pokefair === true)
        {
            output += "This sync pair is Poke Fair exclusive.\n";
        }
        if(data.masterfair === true)
        {
            output += "This sync pair is a master sync pair.\n";
        }
        if(data.f2p === true)
        {
            output += "This sync pair is obtained via story mode or an event.\n";
        }
        // Must do it this way to avoid errors and warnings since this property only exists on select sync pairs
        if(data.hasOwnProperty("seasonal"))
        {
            if(data.seasonal === true)
            {
                output += "This sync pair is a seasonal sync pair.\n";
            }
        }
        output += "Collective Strength: " + module.exports.calculate_strength(data);

        // Determine if it is a 3*, 4*, or 5* and calculate max stats.
        let stars = 5;
        if(data.hasOwnProperty("stars"))
        {
            stars = data.stars;
        }

        data.hp = parseInt(data.hp);
        data.atk = parseInt(data.atk);
        data.def = parseInt(data.def);
        data.spatk = parseInt(data.spatk);
        data.spdef = parseInt(data.spdef);
        data.speed = parseInt(data.speed);

        if(stars === 5)
        {
            data.maxhp = data.hp + 100;
            data.maxatk = data.atk + 40;
            data.maxdef = data.def + 40;
            data.maxspatk = data.spatk + 40;
            data.maxspdef = data.spdef + 40;
            data.maxspeed = data.speed + 40;
        }
        else
        {
            let bonus = 5 - stars;
            // Use parenthesis to ensure consistent behavior.
            data.maxhp = data.hp + (bonus * 40);
            data.maxatk = data.atk + (bonus * 20);
            data.maxdef = data.def + (bonus * 20);
            data.maxspatk = data.spatk + (bonus * 20);
            data.maxspdef = data.spdef + (bonus * 20);
            data.maxspeed = data.speed + (bonus * 20);
        }
        output += "\n\nMax Stats\n";
        output += "Max HP: " + Intl.NumberFormat("en-US").format(data.maxhp) + "\t\t Max SpAtk: " + Intl.NumberFormat("en-US").format(data.maxspatk) + "\n";
        output += "Max Atk: " + Intl.NumberFormat("en-US").format(data.maxatk) + "\t\tMax SpDef: " + Intl.NumberFormat("en-US").format(data.maxspdef) + "\n";
        output += "Max Def: " + Intl.NumberFormat("en-US").format(data.maxdef) + "\t\tMax Speed: " + Intl.NumberFormat("en-US").format(data.maxspeed) + "\n";
        output += "Max Collective Strength: " + module.exports.calculate_strength_max(data);

        return output;
    },
    "calculate_strength": (data) => {
        let strength = (data.hp * 4) + (data.atk * 6) + (data.def * 4) + (data.spatk * 6) + (data.spdef * 4) + (data.speed * 6);
        if(strength % 5 === 5 || strength % 5 === 0)
        {
            return Intl.NumberFormat("en-US").format(strength);
        }
        else
        {
            return Intl.NumberFormat("en-US").format(strength - (strength % 5));
        }
    },
    "calculate_strength_max": (data) => {
            let strength = (data.maxhp * 4) + (data.maxatk * 6) + (data.maxdef * 4) + (data.maxspatk * 6) + (data.maxspdef * 4) + (data.maxspeed * 6);
            if(strength % 5 === 5 || strength % 5 === 0)
            {
                return Intl.NumberFormat("en-US").format(strength);
            }
            else
            {
                return Intl.NumberFormat("en-US").format(strength - (strength % 5));
            }
    }
}