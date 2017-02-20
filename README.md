# jc3mp-mvs
Mod for JC3MP - players can spawn multiple vehicles (configurable), optional spawn in vehicle, some anti-spam-spawn measures.

Edit config.json to your preferences.

{
	"maxnumberofvehicles": 4,
	"autoenter": false,
	"canspawninvehicle": false,
	"mintimebetweenspawns": 5000
}

maxnumberofvehicles -> How many active vehicles each player can have at once. As more vehicles are spawned, the first spawned are despawned.
autoenter -> Should players be automatically placed in vehicles they spawn?
canspawninvehicle -> Should players be able to spawn a vehicle while already in a vehicle? Doesn't always prevent accidental explosions.
mintimebetweenspawns -> Time a player must wait between spawning vehicles in ms (e.g. 5000 = 5s)
