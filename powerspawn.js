var powerSpawnLogic = {
    run: function() {
        // 检查 Power Spawn 是否存在
        var powerSpawn = Game.getObjectById("你的Power Spawn的ID");
        if (powerSpawn) {
            // 检查能量和Power资源是否充足，执行能量生成
            if (powerSpawn.power >= 1 && powerSpawn.energy >= 50) {
                if (powerSpawn.processPower() == OK) {
                    console.log("Power processed successfully");
                }
            }
        }
    }
};

module.exports = powerSpawnLogic;
