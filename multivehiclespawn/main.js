'use strict';

global.freeroam = {
	config: require('../freeroam/gm/config'),
	commands: jcmp.events.Call('get_command_manager')[0],
	chat: jcmp.events.Call('get_chat')[0],
	utils: require('../freeroam/gm/utility')
};

const config = require("./config.json");
const maxnumvehicles = config.maxnumberofvehicles;
const autoenter = config.autoenter;
const canspawninvehicle = config.canspawninvehicle;
const mintimebetweenspawns = config.mintimebetweenspawns;

//Load in the command file(s)
freeroam.commands.loadFromDirectory(`${__dirname}/commands`, (f, ...a) => require(f)(...a));
console.log(`${__dirname}`);

jcmp.events.Add("PlayerCreated", player => {
    player.ownedvehicles = [];
	player.currvehicle = 0;
	player.canspawnvehicles = true;
});

jcmp.events.Add("PlayerDestroyed", player => {
	//destroy all vehicles this player spawned
		for(var i=0;i<player.ownedvehicles.length;i++){
			if (typeof player.ownedvehicles[i] !== 'undefined'){
				player.ownedvehicles[i].Destroy();
			}
		}
});

jcmp.events.Add("spawnmenu/local/spawnVehicle", player => {
	if (typeof player.ownedvehicles[player.currvehicle] !== 'undefined'){
	player.ownedvehicles[player.currvehicle].Destroy();
	}
	
});

jcmp.events.Add("spawnmenu/local/vehicleSpawned", (player, vehicle) => {
	//dirty frig to stop standard event in freeroam package from despawning vehicles
	//relatively long 1000ms Timeout at least reduces the scope for spam-spawning
	setTimeout(function() {delete player.spawnedVehicle;}, 1000);
	//this Timeout will not delay running the code below VVV
	
	if(player.canspawnvehicles === false) {
		freeroam.chat.send(player, 'You\'ve been barred from spawning vehicles', freeroam.config.colours.red);
		vehicle.Destroy();
		return;
	}
	
	if (typeof player.vehicle !== 'undefined' && canspawninvehicle == false) {
		freeroam.chat.send(player, 'You can\'t spawn a vehicle while in another vehicle.', freeroam.config.colours.red);
		vehicle.Destroy();
		return;
    }
	
	if(new Date().getTime() <  player.vehiclespawnedtime + mintimebetweenspawns){
		var remtime =  (player.vehiclespawnedtime + mintimebetweenspawns - new Date().getTime())/1000;
		freeroam.chat.send(player, `Wait ${remtime}s before spawning another vehicle`, freeroam.config.colours.red);
		vehicle.Destroy();
		return;
	}
	
	if(autoenter == true){
		vehicle.SetOccupant(0, player);
	}
	
	player.ownedvehicles[player.currvehicle] = vehicle;
	if(player.currvehicle < (maxnumvehicles - 1)){
		player.currvehicle = player.currvehicle + 1
	}
	else{
		player.currvehicle = 0
	}	
	player.vehiclespawnedtime = new Date().getTime();
});
