module.exports = {
    "name": "donate",
    "description": "Generates a link to donate to the bot creator.",
    "hasarguments": false,
    "alias": "paypal",
    "execute": (msg, args) =>
    {
        let paypalLink = "https://paypal.me/MarkJanssen?locale.x=en_US";
        return "Thank you for considering making a donation to help support the Pokemno Masters Bot.  You can make a donation here: " + paypalLink;
    }
}