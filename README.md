# jc3mp-mvs
Mod for JC3MP - players can spawn multiple vehicles (configurable), optional spawn in vehicle, some anti-spam-spawn measures.

Installation - stick the multivehiclespawn directory in your server packages directory

Options:
--------
Change these in config.json

maxnumberofvehicles -> How many vehicles each player can spawn before they start despawning.
First spawned is first to despawn. Default 4.

autoenter -> Should player be put in a vehicle as soon as they've spawned it? Default false.

canspawninvehicle -> Should player be allowed to spawn vehicles while in a vehicle?
Doesn't always prevent accidents/explosions (not possible without interfering with standard packages)
Default false.

mintimebetweenspawns -> Time in milliseconds a player must wait between spawning vehicles.
Default 5000. (That's 5 seconds ;) )

Bonus!
------
Includes the command /blockvehicles (or /bvs).
Can be used by admins to block a player from spawning vehicles (e.g. if they're being a dick).
Usage:
/blockvehicles <playername>
Each use of the command toggles a player's ability to spawn vehicles.


