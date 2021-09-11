const BPDATA = require("../bp.json");

module.exports = {
    "name": "maxbp",
    "description": "Calculate the maximum BP that is possible to earn.",
    "hasarguments": false,
    "alias": "bpcalc",
    "execute": (msg, args) =>
    {
        /* Any commands that alter the contents of ../bp.json must delete the require cache for the file so the proper value is returned.  THe only thing that should change
        is how many BP come from events. */

        // First get the current timestamp.
        // Any final calculations use ceil because you don't have to do it at a specific time of day.
        let timestamp = Date.now() / 1000;
        let daily_difference = timestamp - BPDATA.daily;
        // One day is 86400 seconds.  Multiple by 60 since you can get 60 BP per day with the daily stage.
        let daily_total = Math.ceil(daily_difference / 86400) * 60;

        // Start working on Champion Stadium which is weekly.
        let stadium_difference = timestamp - BPDATA.championstadium;
        // Parenthesis between 86400 and 7 to ensure consistent behavior in any environment.
        let weekly_total = Math.ceil(stadium_difference / ( 86400 * 7)) * 40;

        let event_total = BPDATA.event;
        let maxbp = daily_total + weekly_total + event_total;
        return "The maximum BP so far is " + maxbp + ".";
    }
}