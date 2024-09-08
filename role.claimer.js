var roleClaimer = {
    targetRoom: 'E26N2', // 要占领的目标房间
    targetControllerId: '5bbcae719099fc012e6390f5', // 要占领的控制器 ID

    run: function(creep) {
        // 如果 Creep 不在目标房间，移动到目标房间
        if (creep.room.name !== this.targetRoom) {
            var exitDir = creep.room.findExitTo(this.targetRoom);
            var exit = creep.pos.findClosestByRange(exitDir);

            if (exit) {
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
                console.log(`Claimer ${creep.name} is moving to room ${this.targetRoom}`);
            } else {
                console.log(`Claimer ${creep.name} cannot find exit to room ${this.targetRoom}`);
            }
        } else {
            // 在目标房间中，获取目标控制器对象
            const controller = Game.getObjectById(this.targetControllerId);
            if (!controller) {
                console.log(`Claimer ${creep.name} cannot find target controller ${this.targetControllerId}`);
                return;
            }

            // 如果房间控制器不是我方的，则尝试占领
            if (!controller.my) {
                const claimResult = creep.claimController(controller);
                if (claimResult === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                    console.log(`Claimer ${creep.name} is moving to claim controller in room ${this.targetRoom}`);
                } else if (claimResult === OK) {
                    console.log(`Claimer ${creep.name} successfully claimed controller in room ${this.targetRoom}`);
                } else {
                    console.log(`Claimer ${creep.name} encountered error ${claimResult} while trying to claim controller`);
                }
                return; // 等待下一轮执行
            }

            // 执行 sign 操作
            const message = "We are the universe, and we are tring to understand ourself";
            const signResult = creep.signController(controller, message);

            if (signResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                console.log(`Claimer ${creep.name} is moving to sign controller in room ${this.targetRoom}`);
            } else if (signResult === OK) {
                console.log(`Claimer ${creep.name} successfully signed the controller in room ${this.targetRoom}`);
            } else {
                console.log(`Claimer ${creep.name} encountered error ${signResult} while trying to sign the controller`);
            }
        }
    }
};

module.exports = roleClaimer;

