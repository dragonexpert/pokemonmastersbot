    module.exports = {
        "name": "subscribe",
        "description": "Generates a link to subscribe to the bot owner's Youtube channel.",
        "hasarguments": false,
        "alias": "youtube",
        "execute": (msg, args) =>
        {
            let youtubeLink = "https://www.youtube.com/user/dragonexpert8323/featured\n";
            return "You can subscribe to my Youtube channel where I put out Pokemon Masters EX content and some other content here: " + youtubeLink;
        }
    }