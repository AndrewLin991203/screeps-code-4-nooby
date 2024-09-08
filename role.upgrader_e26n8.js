const roleUpgraderE26N8 = {
    run: function (creep) {
      // 检查爬虫的状态，初始状态为 Harvesting
      if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
      }
      if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
        creep.memory.working = false;
      }
  
      if (!creep.memory.working) {
        // Harvesting 阶段，去 E26N8 采集能量
        if (creep.room.name !== "E26N8") {
          creep.moveTo(new RoomPosition(25, 25, "E26N8"), {
            visualizePathStyle: { stroke: "#ffaa00" },
          });
        } else {
          // 到达 E26N8 后找能量源
          var sources = creep.room.find(FIND_SOURCES);
          if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {
              visualizePathStyle: { stroke: "#ffaa00" },
            });
          }
        }
      } else {
        // Upgrading 阶段，升级控制器
        if (creep.room.name !== "E26N8") {
          creep.moveTo(new RoomPosition(25, 25, "E26N8"), {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        } else {
          if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {
              visualizePathStyle: { stroke: "#ffffff" },
            });
          }
        }
      }
    },
  };
  
  module.exports = roleUpgraderE26N8;
  