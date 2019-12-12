function spawnBuilder() {
    Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1' + Game.time, { memory: { role: 'builder' }});
}

function spawnHarvester() {
    Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester' + Game.time, { memory: { role: 'harvester' }});
}

function spawnUpgrader() {
    Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader' + Game.time, { memory: { role: 'upgrader' }});
}

export{spawnBuilder, spawnHarvester, spawnUpgrader};
