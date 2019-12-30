var roleKnight = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            creep.attack(closestHostile);
        } else {
            let assemblyPointIndex = creep.memory.assemblyIndex;
            
            creep.moveTo(Game.flags["KnightAssembly" + (assemblyPointIndex+1)]);
        }
    }
};

module.exports = roleKnight;
