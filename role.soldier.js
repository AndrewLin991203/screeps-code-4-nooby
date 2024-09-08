const roleSoldier = {
    run: function (creep) {
      // 指定攻击目标的房间和位置
      const targetRoom = "E28N8";
      const targetFlag = Game.flags['Attack'];
  
      if (creep.room.name !== targetRoom) {
        // 移动到目标房间
        creep.moveTo(new RoomPosition(25, 25, targetRoom), {
          visualizePathStyle: { stroke: '#ff0000' }
        });
      } else {
        if (targetFlag) {
          // 移动到攻击标记位置
          creep.moveTo(targetFlag, { visualizePathStyle: { stroke: '#ff0000' } });
  
          // 攻击标记位置附近的敌方单位
          const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
            }
          } else {
            // 如果没有敌方单位，攻击敌方房间控制器
            const controller = creep.room.controller;
            if (controller && controller.owner && controller.owner.username !== creep.owner.username) {
              if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, { visualizePathStyle: { stroke: '#ff0000' } });
              }
            }
          }
        } else {
          // 没有标记时，待在房间内的指定位置
          creep.moveTo(new RoomPosition(25, 25, targetRoom), { visualizePathStyle: { stroke: '#ff0000' } });
        }
      }
    }
  };
  
  module.exports = roleSoldier;