module.exports = {
    "name": "passive",
    "description": "View information about a passive skill",
    "hasarguments": true,
    "alias": "skill",
    "execute": (msg, args) =>
    {
        const passives = require("../Passives/passives.json");
        delete require.cache[require.resolve("../Passives/passives.json")];
        let splitter = msg.content.split(" ");
        let originalskill = "";
        // This gets rid of all the nasty spaces.
        let y = 0;
        let space = "";
        for(x in splitter)
        {
            if(y !== 0)
            {
                originalskill += space + splitter[x];
            }
            space = " ";
            ++y;
        }
        // Get rid of punctuation
        let skill = originalskill.replace(/[^a-zA-Z]/gi, "").toLowerCase();
        try
        {
            let info = passives[skill];
            if(info === undefined)
            {
                return "Unable to find data for skill: " + originalskill;
            }
            return "**" + originalskill + "**" + "\n" + info;
        }
        catch(Exception)
        {
            console.error(Exception);
            return "There was a problem fetching the skill: " + originalskill;
        }
    }
}