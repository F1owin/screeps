var roleMechanic = {

    /** @param {Creep} creep **/
    run: function(creep) {

    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0)
    {
      creep.memory.repairing = false;
      creep.say('🔄 harvest');
    }

    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
        creep.memory.repairing = true;
        creep.say('⚡ repair');
    }

    if(creep.memory.repairing)
    {
        var potentialRepairSites = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)}});    
        var repairSite = potentialRepairSites[0];

        for(i=0; i < potentialRepairSites.length; i++) {
            if(potentialRepairSites[i].hits < repairSite.hits) {
                repairSite = potentialRepairSites[i];
            }
            
        }

        if(creep.repair(repairSite) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(repairSite, {visualizePathStyle: {stroke: '#ffaa00'}});
        }            
    }
    else
    {
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

module.exports = roleMechanic;
