# pokemonmastersbot
My Pokemon Masters Discord Bot

## Contributing
The main thing I am going to want assistance with is sync pair data.  The easiest way to make them is to just copy the content from SyncPairs/ssred.json and put it
into a new file.  The file name should not have spaces or special characters and must have the .json ending.  The field called "name" is the most important field.  This is how the data is normally retrieved.  It must be in all lowercase and preferably no spaces.  The field "nicename" is used to output the name of the sync pair with normal capitalization and no abbreviations.  The field called "alias" is a secondary way that the sync pair can get called.  For most sync pairs, posting the Pokemon name is a good choice, keeping in mind that it must be lowercase.  When you have created a proper .json file, submit a Pull Request to this repository so I get a notification.  I will look over and approve them at my earliest opportunity.

You can also request features to be added to the bot.  Please create an issue for them.  I would eventually like to make it automatically update the bot in real time when a Pull Request on Github gets approved, but it will be something I'll have to figure out.

Do not edit the file bp.json for any reason unless you are changing what the current event BP is.  The other fields use a timestamp so that it can be automatically calculated on the fly.
