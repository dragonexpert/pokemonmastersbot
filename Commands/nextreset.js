module.exports = {
    "name": "nextreset",
    "description": "States the time remaining until the next reset.",
    "hasarguments": false,
    "alias": "reset",
    "execute": (msg, args) =>
    {
        let current_time = new Date();
        let hours = 24 - (current_time.getHours() - 5);
        if(hours < 0)
        {
            hours = 24 - hours;
        }
        if(hours > 24)
        {
            hours -= 24;
        }
        let minutes = 60 - current_time.getMinutes();
        let seconds = 60 - current_time.getSeconds();
        let message = "";
        if(minutes === 60)
        {
            minutes = 0;
            hours += 1;
        }
        if(hours >= 1)
        {
            message += hours + " hours ";
        }
        if(minutes < 1)
        {
            // Return the seconds
            if(seconds >= 1)
            {
                message += " " + seconds + " seconds";
            }
        }
        else
        {
            // We do have minutes
            if(minutes === 1)
            {
                message += 1 + " minute ";
                // Return the seconds
                if(seconds >= 1)
                {
                    message += " " + seconds + " seconds";
                }
            }
            else
            {
                // More than 1 minute
                message += minutes + " minutes ";
                // Return the seconds
                if(seconds >= 1)
                {
                    message += " " + seconds + " seconds";
                }
            }
        } // End minutes
        return "The next reset will occur in " + message;
    } // End command
}