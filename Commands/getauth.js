const Config = require("../config.json");
const fs = require("fs");

module.exports = {
    "name": "getauth",
    "description": "Lists the auth level of the mentioned user.",
    "hasarguments": false,
    "alias": "botauth",
    "auth": 3,
    "execute": (msg, args) =>
    {
        let userid = msg.author.id;
        try
        {
            let member = msg.mentions.members.first();
            userid = member.id;
        }
        catch(Exception)
        {
            userid = msg.author.id;
        }
        let auth = module.exports.getAuth(userid);
        if(auth === 10)
        {
            return "The user is the owner of the bot.";
        }
        else if(auth === 5)
        {
            return "The user is a bot owner.";
        }
        else if(auth === 4)
        {
            return "The user is a bot administrator.";
        }
        else if(auth === 3)
        {
            return "The user is a bot moderator.";
        }
        else
        {
            return "The user is a standard bot user.";
        }
    },
    "getAuth": (userid) =>
    {
        if(parseInt(userid) === parseInt(Config.bot_owner))
        {
            return 10;
        }
        try
        {
            const myAuth = require("../auth.json");
            delete require.cache[require.resolve("../auth.json")];
            if (myAuth.moderator.includes(userid))
            {
                return 3;
            }
            if (myAuth.admin.includes(userid))
            {
                return 4;
            }
            if (myAuth.owner.includes(userid))
            {
                return 5;
            }
            return 1;
        }
        catch (Exception)
        {
            console.error(Exception);
            // Return a 1 if it fails because it is better to not let a user have access to a command they might not have permission to use.
            return 1;
        }
    }
}