const sqlite3 = require("sqlite3");

module.exports = {
    "name": "setfc",
    "description": "Set your friend code for others to look up.",
    "hasarguments": true,
    "execute": (msg, args) =>
    {
        let splitter = msg.content.split(" ");
        let friendcode = splitter[1];
        let sql = "INSERT INTO friendcodes(discordid, username, friendcode) VALUES(" + msg.author.id + ", '" + msg.author.username + "', '" + friendcode + "')";
        let db = new sqlite3.Database("pokemonmasters.db", (err) => {
            if (err) {
                console.error(err.message);
            }
        });
        // The next line makes sure you don't get endless entries for the same user.
        db.run("DELETE FROM friendcodes WHERE discordid = " + msg.author.id);
        db.run(sql);
        db.close();
        return "Your friend code has been added to the database.";
    } // End execution
}