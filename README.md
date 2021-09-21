# pokemonmastersbot
This Disscord Bot is to help with the mobile app Pokemon Masters EX.  It has lots of information for sync pairs.  Egg sync pairs are not something I plan on adding because more often than not, there is a better sync pair for the task.  If someone wants to tackle that as a project they are welcome to, just create a new directory for egg sync pairs since it would be easier to keep them out of the general pool.

## Commands

The bot prefix is pm! and is currently not changeable at the guild level.  It is capable of responding to a DM that uses a command.

Current commands:  
- help: lists all commands you have access to
- help [commandName]: Gives information about the command
- view [name|pokemon]: Pulls up the information for the sync pair.
- search [parameters]: Searches for all sync pairs matching the criteria.  Currently supports: type [TypeHere], ex, mega, dynamax, pokefair, masterfair, f2p, [statname] [value].
- getcookie [Lucky Skill]: States which lucky cookies can give you the desired skill.
- contribute: Sends a link to this repository.
- invite: Generates a link to invite the bot to your guild.
- la [BOSS]: Display information about a particular Legendary Arena boss.
- maxbp: States what the current maximum BP you can be at is.
- setfc [Friend Code]: Store your friend code for the game.  Please use hypen for readability.
- getfc @[username]: Get the friend code of the mentioned user. If no user is mentioned, returns the author's friend code.
- nextreset: States how long until the next reset.
 
 Slash commands are not currently implemented.  I would like to make them at some point.
 
 Future Commands:
 - passive [Passive Name]: Displays what a passive skill does.
 

## Contributing
The main thing I am going to want assistance with is sync pair data.  The easiest way to make them is to just copy the content from SyncPairs/ssred.json and put it
into a new file.  The file name should not have spaces or special characters and must have the .json ending.  The field called "name" is the most important field.  This is how the data is normally retrieved.  It must be in all lowercase and preferably no spaces.  The field "nicename" is used to output the name of the sync pair with normal capitalization and no abbreviations.  The field called "alias" is a secondary way that the sync pair can get called.  For most sync pairs, posting the Pokemon name is a good choice, keeping in mind that it must be lowercase.  When you have created a proper .json file, submit a Pull Request to this repository so I get a notification.  I will look over and approve them at my earliest opportunity.  The remaining sync pairs that need to be added are either story pairs or are a 3 star and 4 star pair.

You can also request features to be added to the bot.  Please create an issue for them.  I would eventually like to make it automatically update the bot in real time when a Pull Request on Github gets approved, but it will be something I'll have to figure out.

Do not edit the file bp.json for any reason unless you are changing what the current event BP is.  The other fields use a timestamp so that it can be automatically calculated on the fly.

If you would like to donate to help support the bot please message Latios#2778 on Discord.

## Bot Auth
Do not ask to gain auth so you can use certain commands.  Auth will be given on an as-needed basis.  Most of the auth commands are used to modify the bot data and are not specific to a guild.  There are plenty of other bots to handle moderation issues.
