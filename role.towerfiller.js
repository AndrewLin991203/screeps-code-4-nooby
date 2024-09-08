var roleTowerFiller = {

    run: function(creep) {
        // 在creep的memory中存储目标塔的ID
        if (!creep.memory.targetTower) {
            // 创建塔的ID数组
            var towerIds = [
                '666bf49c0852872725fdcf12',
                '6671df16963c5e06da5cf549' ,
                '6673a553da8491f9f4f913f8',
                ''
                // 添加新的塔ID
            ];
            
            // 随机选择一个塔的ID
            creep.memory.targetTower = towerIds[Math.floor(Math.random() * towerIds.length)];
        }

        var targetTower = Game.getObjectById(creep.memory.targetTower);

        // 检查creep是否有能量，如果没有，寻找能量源
        if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            // 使用你提供的采矿逻辑
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // 如果creep有能量，将其转移到目标塔
        else {
            if (creep.transfer(targetTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targetTower, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleTowerFiller;
