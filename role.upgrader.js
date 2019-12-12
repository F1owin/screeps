var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sourceIndex = creep.memory.sourceIndex;
            var sources = creep.room.find(FIND_SOURCES);

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
    }
};

module.exports = roleUpgrader;
