var nameGenerator = {
    getName: function() {
        // 31 NAMES
        const _NAMES = ['Balder', 'Bragi', 'Forseti', 'Frey', 'Freyr', 'Frigg', 'Heimdall', 'Hödur', 'Idun', 'Jörd', 'Loki', 'Njörd', 'Odin', 'Siwa', 'Thor', 'Tyr', 'Wali', 'Wodan', 'Wotan', 'Wuotan', 'Freya', 'Fricka', 'Frowe', 'Hell', 'Hermod', 'Hödur', 'Idun', 'Iduna', 'Jörd', 'Ostara', 'Thisa'];
        let excludeNames = [];

        for(var name in Memory.creeps) {
            if(Game.creeps[name]) {
                excludeNames.push(name);
            }
        }

        let availableNames = _NAMES.filter(function(el) {
            return excludeNames.indexOf(el) < 0;
        });

        return _.sample(availableNames);
    }
};

module.exports = nameGenerator;