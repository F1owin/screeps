var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
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
    }
};

module.exports = roleBuilder;
