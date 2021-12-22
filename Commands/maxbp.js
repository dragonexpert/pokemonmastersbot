const fs = require("fs");
module.exports = {
    "name": "maxbp",
    "description": "Calculate the maximum BP that is possible to earn.",
    "hasarguments": false,
    "alias": "bpcalc",
    "execute": (msg, args) =>
    {
        /* Any commands that alter the contents of ../bp.json must delete the require cache for the file so the proper value is returned.  THe only thing that should change
        is how many BP come from events. */
        let BPDATA = null;
        try
        {
            BPDATA = require("../bp.json");
        }
        catch(Exception)
        {
            console.error(Exception);
            return "Could not read file: bp.json";
        }
        // First get the current timestamp.
        // Any final calculations use ceil because you don't have to do it at a specific time of day.
        let timestamp = Date.now() / 1000;
        let daily_difference = timestamp - BPDATA.daily;
        // One day is 86400 seconds.  Multiple by 60 since you can get 60 BP per day with the daily stage.
        let daily_total = Math.ceil(daily_difference / 86400) * 60;

        // Start working on Champion Stadium which is weekly.
        let stadium_difference = timestamp - BPDATA.championstadium;
        let stadium_additional = timestamp - BPDATA.championsatdiumadditional;

        // Parenthesis between 86400 and 7 to ensure consistent behavior in any environment.
        let weekly_total = Math.ceil(stadium_difference / ( 86400 * 7)) * 40;
        let weekly_additional = Math.ceil(stadium_additional / (86400 * 7)) * 10;

        let event_total = BPDATA.event;
        let alola_penalty = 40;
        let maxbp = daily_total + weekly_total + weekly_additional + event_total - alola_penalty;
        return "The maximum BP so far is " +  Intl.NumberFormat("en-US").format(maxbp) + ".";
    }
}