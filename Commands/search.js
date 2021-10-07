const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    "name": "search",
    "description": "Searches the sync pair roster.  Supported types: type [type], pokefair, masterfair, f2p, mega, dynamax, ex," +
        "hp [number], atk [number], def [number], spatk [number], spdef [number], speed [number].",
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

        let splitter = msg.content.split(" ");

        // DO a sanity check because it is easy to forget to put the word type and just use search water
        let valid_types = ["normal", "rock", "ground", "steel", "electric", "water", "fire", "grass", "poison", "psychic", "bug", "ice", "flying", "fairy", "fighting", "dark", "ghost"];
        if(valid_types.includes(splitter[1].toLowerCase()))
        {
            let temp_array = [];
            temp_array[0] = splitter[0];
            temp_array[1] = "type";
            temp_array[2] = splitter[1];
            for(y = 3; y <= splitter.length; y++)
            {
                temp_array[y] = splitter[y - 1];
            }
            for(z in temp_array)
            {
                splitter[z] = temp_array[z];
            }
        }

        search_criteria = splitter[1].toLowerCase();
        let length = splitter.length;
        if(search_criteria === "type")
        {
            let comma = "";
            // The next 3 lines fix how type is capitalized.
            let string1 = splitter[2].substring(0, 1).toUpperCase();
            let string2 = splitter[2].substring(1).toLowerCase();
            let type = string1 + string2;
            let syncpairs = null;
            if(length === 3)
            {
                syncpairs = msg.syncPairs.filter(user => user.type === type);
            }
            else
            {
                if(splitter[3].toLowerCase() === "striker")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.role.toLowerCase() === "striker" && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "tech")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.role.toLowerCase() === "tech" && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "support")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.role.toLowerCase() === "support" && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "pokefair")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.pokefair === true && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "masterfair" || splitter[3].toLowerCase() === "master")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.masterfair === true && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "ex")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.ex === true && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "mega")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.mega === true && user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "f2p")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.f2p === true && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "seasonal")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.seasonal === true && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "dynamax" || splitter[3].toLowerCase() === "dmax")
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.dynamax === true && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "hp" && !isNaN(splitter[4]))
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.hp >= parseInt(splitter[4]) && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "atk" && !isNaN(splitter[4]))
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.atk >= parseInt(splitter[4]) && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "def" && !isNaN(splitter[4]))
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.def >= parseInt(splitter[4]) && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "spatk" && !isNaN(splitter[4]))
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.spatk >= parseInt(splitter[4]) && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "spdef" && !isNaN(splitter[4]))
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.spdef >= parseInt(splitter[4]) && !user.alias.startsWith("mega"));
                }
                if(splitter[3].toLowerCase() === "speed" && !isNaN(splitter[4]))
                {
                    syncpairs = msg.syncPairs.filter(user => user.type === type && user.speed >= parseInt(splitter[4]) && !user.alias.startsWith("mega"));
                }
            }
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
            let syncpairs = msg.syncPairs.filter(user => user.pokefair === true && !user.alias.startsWith("mega"));
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
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
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
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
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
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
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
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
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
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
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
            });
            return output;
        }
        else if(search_criteria === "seasonal")
        {
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => user.seasonal === true);
            let output = "Search Results: " + syncpairs.size + "\n";
            if(syncpairs.size === 0)
            {
                return "There are no results for the search terms.";
            }
            syncpairs.each(data =>
            {
                // Ignore megas for this
                if(!data.alias.startsWith("mega"))
                {
                    output += comma + data.nicename;
                    comma = ", ";
                }
            });
            return output;
        }
        else if(search_criteria === "hp")
        {
            if(splitter.length < 3)
            {
                return "You must provide a numeric value.";
            }
            let target = parseInt(splitter[2]);
            if(target < 1)
            {
                return "The value must be greater than zero.";
            }
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => parseInt(user.hp) >= target);
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
        else if(search_criteria === "atk")
        {
            if(splitter.length < 3)
            {
                return "You must provide a numeric value.";
            }
            let target = parseInt(splitter[2]);
            if(target < 1)
            {
                return "The value must be greater than zero.";
            }
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => parseInt(user.atk) >= target);
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
        else if(search_criteria === "def")
        {
            if(splitter.length < 3)
            {
                return "You must provide a numeric value.";
            }
            let target = parseInt(splitter[2]);
            if(target < 1)
            {
                return "The value must be greater than zero.";
            }
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => parseInt(user.def) >= target);
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
        else if(search_criteria === "spatk")
        {
            if(splitter.length < 3)
            {
                return "You must provide a numeric value.";
            }
            let target = parseInt(splitter[2]);
            if(target < 1)
            {
                return "The value must be greater than zero.";
            }
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => parseInt(user.spatk) >= target);
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
        else if(search_criteria === "spdef")
        {
            if(splitter.length < 3)
            {
                return "You must provide a numeric value.";
            }
            let target = parseInt(splitter[2]);
            if(target < 1)
            {
                return "The value must be greater than zero.";
            }
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => parseInt(user.spdef) >= target);
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
        else if(search_criteria === "speed")
        {
            if(splitter.length < 3)
            {
                return "You must provide a numeric value.";
            }
            let target = parseInt(splitter[2]);
            if(target < 1)
            {
                return "The value must be greater than zero.";
            }
            let comma = "";
            let syncpairs = msg.syncPairs.filter(user => parseInt(user.speed) >= target);
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
            return "The search type you are trying is not supported.  Supported filters: type [type], pokefair, masterfair, f2p, mega, dynamax, ex," +
                " hp [number], atk [number], def [number], spatk [number], spdef [number], speed [number]. " +
                "Note that if you use EX, the result will be DM'd regardless of if it was in a guild channel due to it being a lengthy result."
        }
    }
}