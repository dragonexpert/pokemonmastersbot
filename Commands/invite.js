const Discord = require("discord.js");

module.exports = {
    "name": "invite",
    "description": "Generates a link to invite the bot to your guild.",
    "hasarguments": false,
    "alias": "addbot",
    "execute": (msg, args) =>
    {
        return "You can invite the bot into your guild with this link: " + msg.client.generateInvite({
            scopes: ['bot', 'applications.commands'],
            permissions: "105226701824"
        });
    }
}