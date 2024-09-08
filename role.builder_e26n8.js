var targetRoomName = 'E26N8';
var homeRoomName = 'E26N8';

var roleBuilderE26N8 = {
    run: function (creep) {
        // 确认 creep 的工作状态
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        // 在建造状态时
        if (creep.memory.building) {
            if (creep.room.name === homeRoomName) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    var constructionSite = targets[0];
                    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    // 如果没有建筑工地，升级控制器
                    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            } else {
                // 如果不在主房间，移动到主房间
                creep.moveTo(new RoomPosition(25, 25, homeRoomName), { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            // 在采集状态时
            if (creep.room.name === targetRoomName) {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                // 如果不在资源房间，移动到资源房间
                creep.moveTo(new RoomPosition(25, 25, targetRoomName), { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilderE26N8;