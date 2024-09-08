var roleHarvesterE28N7 = require("./role.harvester_e28n7");
var roleHarvesterE28N8 = require("./role.harvester_e28n8");
var roleHarvesterE26N8 = require("./role.harvester_e26n8");  // 新增
var roleSoldier = require("./role.soldier");
var roleTowerFiller = require("./role.towerfiller");
var roleClaimer = require("./role.claimer");
var roleUpgraderE28N7 = require("./role.upgrader_e28n7");
var roleUpgraderE28N8 = require("./role.upgrader_e28n8");
var roleUpgraderE26N8 = require("./role.upgrader_e26n8");  // 新增
var roleBuilderE28N7 = require("./role.builder_e28n7");
var roleBuilderE28N8 = require("./role.builder_e28n8");
var roleBuilderE26N8 = require("./role.builder_e26n8");  // 新增
var towerLogic = require("./tower");

// 主循环
module.exports.loop = function () {
    // 清理内存中死亡 Creep 的数据
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Memory for creep " + name + " has been cleared.");
        }
    }

    // Creep 生成逻辑
    var roles = {
        harvester_e28n7: { role: "harvester_e28n7", limit: 8, body: [WORK, CARRY, CARRY, MOVE, MOVE], spawn: "Spawn4" },
        harvester_e28n8: { role: "harvester_e28n8", limit: 8, body: [WORK,CARRY,MOVE,MOVE], spawn: "Spawn5" },
        harvester_e26n8: { role: "harvester_e26n8", limit: 7, body: [WORK,WORK, CARRY,MOVE], spawn: "Spawn3" },  // 新增
        soldier: { role: "soldier", limit: 0, body: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, RANGED_ATTACK, MOVE], spawn: "Spawn2" },
        towerfiller: { role: "towerfiller", limit: 0, body: [WORK, CARRY, MOVE], spawn: "Spawn1" },
        claimer: { role: "claimer", limit: 0, body: [CLAIM, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], spawn: "Spawn4" },
        upgrader_e28n7: { role: "upgrader_e28n7", limit: 2, body: [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], spawn: "Spawn1" },
        upgrader_e28n8: { role: "upgrader_e28n8", limit: 3, body: [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], spawn: "Spawn5" },
        upgrader_e26n8: { role: "upgrader_e26n8", limit: 3, body: [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], spawn: "Spawn3" },  // 新增
        builder_e28n7: { role: "builder_e28n7", limit: 7, body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE], spawn: "Spawn1" },
        builder_e28n8: { role: "builder_e28n8", limit: 3, body: [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], spawn: "Spawn2" },
        builder_e26n8: { role: "builder_e26n8", limit: 2, body: [WORK, CARRY,CARRY, MOVE, MOVE], spawn: "Spawn3" }  // 新增
    };

    // 获取所有孵化器
    var spawns = {
        "Spawn1": Game.spawns["Spawn1"],
        "Spawn2": Game.spawns["Spawn2"],
        "Spawn3": Game.spawns["Spawn3"],
        "Spawn4": Game.spawns["Spawn4"],
        "Spawn5": Game.spawns["Spawn5"]
    };

    // 每 50 ticks 检查并生成 Creep
    if (Game.time % 50 === 0) {
        for (let spawnName in spawns) {
            let spawn = spawns[spawnName];
            if (spawn && spawn.spawning === null) {
                // 遍历角色并生成需要的 Creep
                for (let roleName in roles) {
                    let role = roles[roleName];
                    if (role.spawn === spawnName) {
                        // 获取当前角色的 Creep 数量
                        let creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role.role);
                        if (creeps.length < role.limit) {
                            if (role.role === "claimer") {
                                // 不再为 claimer 添加特定的目标房间和控制器ID
                                spawnCreep(spawn, role.role, role.body);
                            } else {
                                spawnCreep(spawn, role.role, role.body);
                            }
                            break; // 一次只生成一个 Creep
                        }
                    }
                }
            }
        }
    }

    // 执行每个 Creep 的角色逻辑
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester_e28n7") {
            roleHarvesterE28N7.run(creep);
        } else if (creep.memory.role == "harvester_e28n8") {
            roleHarvesterE28N8.run(creep);
        } else if (creep.memory.role == "harvester_e26n8") {  // 新增
            roleHarvesterE26N8.run(creep);
        } else if (creep.memory.role == "upgrader_e28n7") {
            roleUpgraderE28N7.run(creep);
        } else if (creep.memory.role == "upgrader_e28n8") {
            roleUpgraderE28N8.run(creep);
        } else if (creep.memory.role == "upgrader_e26n8") {  // 新增
            roleUpgraderE26N8.run(creep);
        } else if (creep.memory.role == "builder_e28n7") {
            roleBuilderE28N7.run(creep);
        } else if (creep.memory.role == "builder_e28n8") {
            roleBuilderE28N8.run(creep);
        } else if (creep.memory.role == "builder_e26n8") {  // 新增
            roleBuilderE26N8.run(creep);
        } else if (creep.memory.role == "soldier") {
            roleSoldier.run(creep);
        } else if (creep.memory.role == "towerfiller") {
            roleTowerFiller.run(creep);
        } else if (creep.memory.role == "claimer") {
            roleClaimer.run(creep);
        }
    }

    // Tower 逻辑
    towerLogic.run();

    // 生成 Creep 函数
    function spawnCreep(spawn, role, body, memory = {}) {
        // 创建一个新的 Creep 名称
        var newName = role.charAt(0).toUpperCase() + role.slice(1) + Game.time;
        console.log("Spawning new " + role + ": " + newName);
        // 尝试生成新的 Creep
        if (spawn.spawnCreep(body, newName, { memory: { role: role, ...memory } }) == OK) {
            console.log(spawn.name + " spawning new " + role);
        }
    }
};