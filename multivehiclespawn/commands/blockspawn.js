module.exports = ({ Command, manager }) => {
	manager.category('admin', 'admin')
		.add(new Command(['blockvehicles', 'bvs'])
		.parameter('target', 'string', 'networkId or (part of) name')
		.description('toggles blocking a player from spawning vehicles', { isTextParameter: true })
		.handler((player, target) => {
			if (!freeroam.utils.isAdmin(player)) {
				freeroam.chat.send(player, 'you are not allowed to use this command', freeroam.config.colours.red)
				return;
			}
			const res = freeroam.utils.getPlayer(target);
			if (res.length === 0 || res.length > 1) {
				freeroam.chat.send(player, 'no / too many matching players!', freeroam.config.colours.red);
				return;
			}
			res[0].canspawnvehicles = !res[0].canspawnvehicles;
			freeroam.chat.send(player, `${res[0].escapedNametagName} canspawnvehicles set to ${res[0].canspawnvehicles}`);
		}));
}		
