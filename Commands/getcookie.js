module.exports = {
    "name": "getcookie",
    "description": "View what cookie gives the desired skill",
    "hasarguments": true,
    "alias": "findskill",
    "execute": (msg, args) =>
    {
        const myArray = require("../Passives/cookies.json");
        delete require.cache[require.resolve("../Passives/cookies.json")];
        try
        {
            let searchterm = "";
            let splitter = args.split(" ");
            let space = "";
            for(x in splitter)
            {
                searchterm += space + splitter[x].substring(0, 1).toUpperCase() + splitter[x].substring(1).toLowerCase();
                space = " ";
            }
            let results = "";
            let comma = "";
            // Fix a common mistake
            searchterm = searchterm.replace("Trouble Maker", "Troublemaker");
            searchterm = searchterm.replace(/tm\s/i, "Troublemaker ");
            searchterm = searchterm.replace(/cs\s/i, "Critical Strike ");
            searchterm = searchterm.replace(/lc\s/i, "Lessen Confusion ");
            if(myArray.crunchy1.includes(searchterm))
            {
                results += comma + "Crunchy Bronze";
                comma = ", ";
            }
            if(myArray.crunchy2.includes(searchterm))
            {
                results += comma + "Crunchy Silver";
                comma = ", ";
            }
            if(myArray.crunchy3.includes(searchterm))
            {
                results += comma + "Crunchy Gold";
                comma = ", ";
            }
            if(myArray.creamy1.includes(searchterm))
            {
                results += comma + "Creamy Bronze";
                comma = ", ";
            }
            if(myArray.creamy2.includes(searchterm))
            {
                results += comma + "Creamy Silver";
                comma = ", ";
            }
            if(myArray.creamy3.includes(searchterm))
            {
                results += comma + "Creamy Gold";
                comma = ", ";
            }
            if(myArray.crispy1.includes(searchterm))
            {
                results += comma + "Crispy Bronze";
                comma = ", ";
            }
            if(myArray.crispy2.includes(searchterm))
            {
                results += comma + "Crispy Silver";
                comma = ", ";
            }
            if(myArray.crispy3.includes(searchterm))
            {
                results += comma + "Crispy Gold";
                comma = ", ";
            }
            if(myArray.chewy.includes(searchterm))
            {
                results += comma + "Chewy";
                comma = ", ";
            }
            if(myArray.deluxe1.includes(searchterm))
            {
                results += comma + "Deluxe Bronze";
                comma = ", ";
            }
            if(myArray.deluxe2.includes(searchterm))
            {
                results += comma + "Deluxe Silver";
                comma = ", ";
            }
            if(myArray.deluxe3.includes(searchterm))
            {
                results += comma + "Deluxe Gold";
                comma = ", ";
            }
            if(results === "")
            {
                return "No cookies were found for the skill: " + searchterm + "!";
            }
            return "The skill " + searchterm + " can be gotten from the following cookies: " + results;
        }
        catch(Exception)
        {
            console.error(Exception);
            return "There was a problem searching for a skill.";
        }
    }
}