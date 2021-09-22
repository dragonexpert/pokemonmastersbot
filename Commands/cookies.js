module.exports = {
    "name": "cookies",
    "description": "View what lucky skills a cookie has.",
    "hasarguments": true,
    "alias": "cookie",
    "execute": (msg, args) =>
    {
        const cookies = require("../Passives/cookies.json");
        delete require.cache[require.resolve("../Passives/cookies.json")];
        let searchterm = args.replace(/[^a-zA-Z0-9]/gi, "").toLowerCase();
        if(searchterm.endsWith("bronze"))
        {
            searchterm = searchterm.replace(/bronze/i, "1");
        }
        if(searchterm.endsWith("silver"))
        {
            searchterm = searchterm.replace(/silver/i, "2");
        }
        if(searchterm.endsWith("gold"))
        {
            searchterm = searchterm.replace(/gold/i, "3");
        }
        let skills = "";
        // Now that operations on complete on the string, we can start
        if(searchterm === "crunchy1")
        {
            skills = cookies.crunchy1.toString();
        }
        else if(searchterm === "crunchy2")
        {
            skills = cookies.crunchy2.toString();
        }
        else if(searchterm === "crunchy3")
        {
            skills = cookies.crunchy3.toString();
        }
        else if(searchterm === "crunchy")
        {
            // They probably meant for gold cookie
            skills = cookies.crunchy3.toString();
        }
        else if(searchterm === "creamy1")
        {
            skills = cookies.creamy1.toString();
        }
        else if(searchterm === "creamy2")
        {
            skills = cookies.creamy2.toString();
        }
        else if(searchterm === "creamy3")
        {
            skills = cookies.creamy3.toString();
        }
        else if(searchterm === "creamy")
        {
            // They probably want gold creamy
            skills = cookies.creamy3.toString();
        }
        else if(searchterm === "crispy1")
        {
            skills = cookies.crispy1.toString();
        }
        else if(searchterm === "crispy2")
        {
            skills = cookies.crispy2.toString();
        }
        else if(searchterm === "crispy3")
        {
            skills = cookies.crispy3.toString();
        }
        else if(searchterm === "crispy")
        {
            // They want gold crispy
            skills = cookies.crispy3.toString();
        }
        else if(searchterm === "chewy")
        {
            skills = cookies.chewy.toString();
        }
        else
        {
            return "Invalid Cookie: " + searchterm;
        }
        return "This cookie can give the following skills: " + skills;
    }
}