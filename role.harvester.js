var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (sourceIndex == 0) {
            var sourceFlag = Game.flags["sourceNW"];
            var creepsAtSource = creep.room.lookForAtArea(LOOK_CREEPS,sourceFlag.pos.x+1,sourceFlag.pos.x-1,sourceFlag.pos.y+1,sourceFlag.pos.y-1,true).length;
            var idleFlag = Game.flags["IdlePoint1"];
            var maxCreepsAtSource = 1;
        } else {
            var sourceFlag = Game.flags["SourceS"];
            var creepsAtSource = creep.room.lookForAt(LOOK_CREEPS,sourceFlag.pos,true).length;
            var idleFlag = Game.flags["IdlePoint2"];
            var maxCreepsAtSource = 3;
        }  
       
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            var sourceIndex = creep.memory.sourceIndex;          

            if (creepsAtSource > maxCreepsAtSource) {
                creep.moveTo(idleFlag);
            } else {
                if(creep.harvest(sources[sourceIndex]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[sourceIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
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
            } else {
                creep.moveTo(idleFlag);
            }
        }
    }
};

module.exports = roleHarvester;
