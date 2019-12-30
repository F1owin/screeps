var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMechanic = require('role.mechanic');
var roleKnight = require('role.knight');
var nameGenerator = require('util.namegenerator');

const MAX_SPAWNS = 20;
const sources = Game.rooms["E1N6"].find(FIND_SOURCES);
const len_sources = Game.rooms["E1N6"].find(FIND_SOURCES).length;


module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var mechanics = _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic');
    var knights = _.filter(Game.creeps, (creep) => creep.memory.role == 'knight');

    if(harvesters.length < 4) {
        var newName = nameGenerator.getName() + " (H)";
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE], newName,
            {memory: {
                role: 'harvester',
                sourceIndex: 1
            }});
    }

    if(builders.length < 2) {
        var newName = nameGenerator.getName() + " (B)";
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE, CARRY, CARRY], newName,
            {memory: {
                role: 'builder',
                sourceIndex: 1
        }});
    }

    if(upgraders.length < 2) {
        var newName = nameGenerator.getName() + " (U)";
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
            {memory: {
                role: 'upgrader',
                sourceIndex: 0
        }});
    }

    if(mechanics.length < 2) {
        var newName = nameGenerator.getName() + " (M)";
        Game.spawns['Spawn1'].spawnCreep([WORK,MOVE,MOVE,CARRY], newName,
            {memory: {
                role: 'mechanic',
                sourceIndex: 0
        }});
    }

    if(knights.length < 4) {
        var newName = nameGenerator.getName() + " (K)";
        if((knights.length % 2) == 1) {
            var newAssemblyIndex = 1;
        } else {
            var newAssemblyIndex = 0;
        }

        Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,ATTACK,MOVE,MOVE], newName,
            {memory: {
                role: 'knight',
                assemblyIndex: newAssemblyIndex
        }});
    }



    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'mechanic') {
            roleMechanic.run(creep);
        }
        if(creep.memory.role == 'knight') {
            roleKnight.run(creep);
        }
    }
}