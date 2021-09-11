const BPDATA = require("../bp.json");
const fs = require("fs");

module.exports = {
    "name": "addbp",
    "description": "Adjust the maximum BP a player could earn through events.",
    "hasarguments": true,
    "alias": "bpadd",
    "execute": (msg, args) =>
    {
        // First figure out what the current event bp is.
        let current_event_bp = BPDATA.event;
        let parts = msg.content.split(" ");
        let new_event_bp = parseInt(current_event_bp) + parseInt(parts[1]);
        let file_contents = "{\n" +
            "\t\"daily\": 1622440800,\n" +
            "\t\"championstadium\": 1628488800,\n" +
            "\t\"event\": " + new_event_bp + "\n" +
            "}";

        try
        {
            let options = {encoding: "utf8"};
            fs.writeFileSync("./bp.json", file_contents, options);
            // Delete the cache
           for(const path in require.cache)
           {
               if(path.endsWith("bp.json"))
               {
                   delete require.cache[path];
                   require(path);
               }
           }
            return "The event bp has been altered.";
        }
        catch (e)
        {
            console.error(e);
            console.log("Could not write to file: bp.json");
            return "Could not write to file: bp.json";
        }
    }
}