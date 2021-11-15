// import Tasking from './db/models/Tasks'
module.exports = function (router) {
    // var tasks = require('./db/models/Tasks');
    var task_controller = require('../../controllers/task_controller')
    console.log("INSIDE===============")

    router.post('/createTask', task_controller.createTask);

    router.post('/updateTask', task_controller.updateTask);

    router.post('/getTask', task_controller.getTask);

    router.post('/removeTask', task_controller.removeTasks);

    router.post('/watchTask', task_controller.watchTask);



    // const user = require(__dirname + '/db/models/Tasks')
    // const validator = async function (req, res, next) {
    //     const test = new Task();
    //     console.log("test==================",test)
    //     const serverTest = await test.createTask()
    //     next();
    // };
    // router.post('/addTasks', validator);

    return router;
}