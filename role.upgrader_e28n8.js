// role.upgrader_e28n8.js

const roleUpgrader_e28n8 = {
    run: function(creep) {
        const sourceRoom = 'E28N8';  // 能量采集房间
        const homeRoom = 'E28N8';    // 升级控制器的房间
        const WHITE_PATH_STYLE = { visualizePathStyle: { stroke: '#ffffff' } };

        // 阶段1: 检查能量状态并更新工作状态
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        // 阶段2: 执行工作逻辑
        if (creep.memory.working) {
            // 如果在升级状态
            if (creep.room.name !== homeRoom) {
                // 如果不在homeRoom，则移动到homeRoom
                this.moveToRoom(creep, homeRoom, WHITE_PATH_STYLE);
            } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // 尝试升级控制器，如果不在范围内则移动过去
                creep.moveTo(creep.room.controller, WHITE_PATH_STYLE);
            }
        } else {
            // 如果在采集状态
            if (creep.room.name !== sourceRoom) {
                // 如果不在sourceRoom，则移动到sourceRoom
                this.moveToRoom(creep, sourceRoom, WHITE_PATH_STYLE);
            } else {
                // 在sourceRoom采集能量
                const sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    // 如果不在范围内则移动过去
                    creep.moveTo(sources[0], WHITE_PATH_STYLE);
                }
            }
        }
    },

    // 跨房间移动函数
    moveToRoom: function(creep, targetRoom, pathStyle) {
        const route = Game.map.findRoute(creep.room.name, targetRoom);
        if (route.length > 0) {
            const exit = creep.pos.findClosestByRange(route[0].exit);
            creep.moveTo(exit, pathStyle);
        }
    }
};

module.exports = roleUpgrader_e28n8;
