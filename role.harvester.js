var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
       
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            var sourceIndex = creep.memory.sourceIndex;

            // Check if sources are occupied
            if (sourceIndex == 0) {
                let sourceFlag = Game.flags["sourceNW"];
                let creepsAtSource = creep.room.lookForAtArea(LOOK_CREEPS,sourceFlag.pos.x+1,sourceFlag.pos.x-1,sourceFlag.pos.y+1,sourceFlag.pos.y-1,true).length;
                let idleFlag = Game.flags["IdlePoint1"];

                if (creepsAtSource > 1) {
                    console.log(creep.name + ": Moving to idle point");
                    creep.moveTo(idleFlag);
                }
            } else {
                let sourceFlag = Game.flags["SourceS"];
                let creepsAtSource = creep.room.lookForAtArea(LOOK_CREEPS,sourceFlag.pos.x+1,sourceFlag.pos.x-1,sourceFlag.pos.y+1,sourceFlag.pos.y-1,true).length;
                let idleFlag = Game.flags["IdlePoint2"];

                if (creepsAtSource > 3) {

                    console.log(creep.name + ": Moving to idle point");
                    creep.moveTo(idleFlag);
                }
            }            

            if(creep.harvest(sources[sourceIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            // console.log(creep.name + ": " + targets);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
