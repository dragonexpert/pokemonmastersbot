module.exports = {
    "name": "maxex",
    "description": "Calculate the maximum number of EX Sync Pairs that a player can have.",
    "hasarguments": false,
    "alias": "excalc",
    "execute": (msg, args) =>
    {
        let championspirits = null;
        try
        {
            championspirits = require("../championspirits.json");
        }
        catch (Exception)
        {
            console.error(Exception);
            return "There was a problem getting the data.";
        }
        let timestamp = Date.now() / 1000;
        let ex_total = 0;
        // Weekly regular champion stadium
        let stadium_total = Math.ceil(((timestamp - championspirits.championstadium) * 25) / (86400 * 7));
        let mastermode_total = Math.ceil(((timestamp - championspirits.mastermode) * 10) / (86400 * 7));
        let event_total = Math.ceil(championspirits.event);
        let first_clear_total = championspirits.first_clear;
        let monthly_total = Math.ceil(((timestamp - championspirits.monthly) * 50) / (86400 * 365.25 / 12));
        let spirit_total = stadium_total + mastermode_total + event_total + first_clear_total + monthly_total;
        ex_total = Math.floor(spirit_total / 50) + championspirits.legendaryex;
        return "The maximum amount of EX Sync Pairs a player can have is " + ex_total;
    }
}