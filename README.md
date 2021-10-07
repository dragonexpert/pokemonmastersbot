# Pokemon Masters Bot
This Discord Bot is to help with the mobile app Pokemon Masters EX. It has lots of information for sync pairs. Egg sync pairs are not a priority because more often than not, there is a better sync pair for the task.  If someone wants to tackle that as a project they are welcome to, just create a new directory for egg sync pairs since it would be easier to keep them out of the general pool.

## Commands

The bot prefix is **pm!** and is currently not changeable at the guild level. It is capable of responding to a DM that uses a command.

### Current commands:
- **help**: lists all commands you have access to
   - **help** [commandName]: Gives information about the command

- **view** [name | pokemon]: Pulls up the information for the sync pair.  Type mega before the Pokemon name to get the info for the mega evolution.

- **search** [parameters]: Searches for all sync pairs matching the criteria.  Currently supports: type [TypeHere], ex, mega, dynamax, seasonal, pokefair, masterfair, f2p, [statname] [value].

- **getcookie** [Lucky Skill]: States which lucky cookies can give you the desired skill.

- **contribute**: Sends a link to this repository.

- **invite**: Generates a link to invite the bot to your guild.

- **la** [BOSS]: Display information about a particular Legendary Arena boss.

- **maxbp**: States what the current maximum BP you can be at is.

- **setfc** [Friend Code]: Store your friend code for the game.  Please use hypen for readability.

- **getfc** @[username]: Get the friend code of the mentioned user. If no user is mentioned, returns the author's friend code.

- **nextreset**: States how long until the next reset.

- **getgear** [gear type]: States which stages have the selected gear type in them.

- **exstage** [ex_stage]: Lists what types of gear drops from the selected stage.

- **passive** [Passive Name]: Displays what a passive skill does.

- **events**: Lists current and upcoming events.  Includes datamined events.

- **top** [hp|atk|def|spatk|spdef|speed]: Lists the top 10 sync pairs with that stat and the stat value.

- **maxex**: States what the maximum number of EX Sync Pairs a player can have.
 
> Slash commands are not currently implemented. I would like to make them at some point.
 
### Future Commands:
 - **maxgear** [stars] [current_level]: States how many of each upgrade item is necessary to max the gear.  

## Contributing

I am looking for a profile picture for the bot so it isn't the default symbol.  It must be [creative commons](https://creativecommons.org/) or be created by you in which case you are granting the rights to use it.

You can request features to be added to the bot.  Please create an issue for them.  I would eventually like to make it automatically update the bot in real time when a Pull Request on Github gets approved, but it will be something I'll have to figure out.

Do not edit the file **bp.json** for any reason unless you are changing what the current event BP is. The other fields use a timestamp so that it can be automatically calculated on the fly.

If you would like to donate to help support the bot please message **Latios#2778** on Discord or use the command ```pm!donate```.

## Bot Auth
Do not ask to gain auth so you can use certain commands.  Auth will be given on an as-needed basis.  Most of the auth commands are used to modify the bot data and are not specific to a guild.  There are plenty of other bots to handle moderation issues.

## Invite
You can invite the bot to your guild clicking [here!](https://discord.com/api/oauth2/authorize?client_id=881659182942670878&scope=bot+applications.commands&permissions=105226701824)
