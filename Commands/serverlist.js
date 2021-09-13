module.exports = {
    "name": "serverlist",
    "description": "Lists what servers the bot is in.",
    "hasarguments": false,
    "alias": "listservers",
    "auth": 3,
    "privateResponse": true,
    "execute": (msg, Client) =>
    {
        let serverlist = Client.guilds.cache;
        content = "Guilds: ( " + serverlist.size + " )";
        let y = 1;
        serverlist.forEach(function (value, key) {
            guildinfo = Client.guilds.resolve(key);
            content += "\n" + y + ") Guild: " + guildinfo.name + " Id: " + guildinfo.id + " Owner: <@" + guildinfo.ownerId + ">";
            ++y;
        });
        return content;
    }
}