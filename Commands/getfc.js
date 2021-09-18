const sqlite3 = require("sqlite3");

module.exports = {
    "name": "getfc",
    "description": "Get the friend code of the mentioned user.",
    "hasarguments": false,
    "execute": (msg, args) =>
    {

        let db = new sqlite3.Database("pokemonmasters.db", (err) => {
            if (err) {
                console.error(err.message);
            }
        });
        let discordid = msg.author.id;
        if(msg.mentions.hasOwnProperty("members"))
        {
            discordid = msg.mentions.members.first();
        }
        let sql = "SELECT * FROM friendcodes WHERE discordid = " + discordid;
        db.get(sql, [], (err, row) =>
        {
            if (err)
            {
                return console.error(err.message);
            }
            return row
                ? msg.channel.send("Friend Code for " + row.username + ": " + row.friendcode)
                : console.log("No rows with that discord id")
        })
        db.close();
    } // End execution
}