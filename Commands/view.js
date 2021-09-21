const Discord = require("discord.js");
const fs = require("fs");

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
        let commandInfo = msg.syncPairs.get(command) || msg.syncPairs.find(cmd => cmd.alias && cmd.alias.includes(command));
        if(!commandInfo)
        {
            return "No data found for " + args + ".";
        }
        return module.exports.format_output(commandInfo);
    },
    "format_output": (data) =>
    {
        if(!data.hasOwnProperty("nicename"))
        {
            data.nicename = data.name + " & " + data.pokemon;
        }
        let output = "Stats for " + data.nicename + "\n";
        output += "Type: " + data.type + "\n";
        output += "Attack Types: " + data.attacktypes + "\n";
        output += "Weakness: " + data.weakness + "\n";
        output += "Role: " + data.role + "\n";
        output += "HP: " + data.hp + "\t\tSpAtk: " + data.spatk + "\n";
        output += "Atk: " + data.atk + "\t\tSpDef: " + data.spdef + "\n";
        output += "Def: " + data.def + "\t\tSpeed: " + data.speed + "\n";
        output += "Moves: " + data.moves + "\n";
        output += "Passives: " + data.passives + "\n";
        if(data.ex === true)
        {
            output += "This sync pair is capable of EX.\n";
        }
        if(data.mega !== false)
        {
            output += "This Pokemon is capable of mega evolution.\n";
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
            data.hp += 100;
            data.atk += 40;
            data.def += 40;
            data.spatk += 40;
            data.spdef += 40;
            data.speed += 40;
        }
        else
        {
            let bonus = 5 - stars;
            // Use parenthesis to ensure consistent behavior.
            data.hp += (bonus * 40);
            data.atk += (bonus * 20);
            data.def += (bonus * 20);
            data.spatk += (bonus * 20);
            data.spdef += (bonus * 20);
            data.speed += (bonus * 20);
        }
        output += "\n\nMax Stats\n";
        output += "Max HP: " + data.hp + "\t\t Max SpAtk: " + data.spatk + "\n";
        output += "Max Atk: " + data.atk + "\t\tMax SpDef: " + data.spdef + "\n";
        output += "Max Def: " + data.def + "\t\tMax Speed: " + data.speed + "\n";
        output += "Max Collective Strength: " + module.exports.calculate_strength(data);

        return output;
    },
    "calculate_strength": (data) => {
        let strength = (data.hp * 4) + (data.atk * 6) + (data.def * 4) + (data.spatk * 6) + (data.spdef * 4) + (data.speed * 6);
        if(strength % 5 === 5 || strength % 5 === 0)
        {
            return strength;
        }
        else
        {
            return strength - (strength % 5);
        }
    }
}