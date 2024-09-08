const roleHarvesterE28N7 = {
    run: function (creep) {
      // 检查爬虫的状态，初始状态为 Harvesting
      if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
      }
      if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
        creep.memory.working = false;
      }
  
      if (!creep.memory.working) {
        // Harvesting 阶段，去 E28N7 采集能量
        if (creep.room.name !== "E28N7") {
          creep.moveTo(new RoomPosition(25, 25, "E28N7"), {
            visualizePathStyle: { stroke: "#ffaa00" },
          });
        } else {
          // 到达 E28N7 后找能量源
          var sources = creep.room.find(FIND_SOURCES);
          if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], {
              visualizePathStyle: { stroke: "#ffaa00" },
            });
          }
        }
      } else {
        // Transferring 阶段，回 E28N7 储存能量
        if (creep.room.name !== "E28N7") {
          creep.moveTo(new RoomPosition(25, 25, "E28N7"), {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        } else {
          // 到达 E28N7 后找储存能量的建筑
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (
                (
                  structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_TOWER ||
                  structure.structureType == STRUCTURE_LINK ||
                  structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
              );
            },
          });
          if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], {
                visualizePathStyle: { stroke: "#ffffff" },
              });
            }
          }
        }
      }
    },
  };
  
  module.exports = roleHarvesterE28N7;