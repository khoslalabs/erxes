// import Tasking from './db/models/Tasks'
module.exports = function (router) {
    // var tasks = require('./db/models/Tasks');
    var deal_controller = require('../../controllers/deal_controller')
    console.log("INSIDE deal===============")

    router.post('/createDeal', deal_controller.createDeal);

    router.post('/updateDeal', deal_controller.updateDeal);

    router.post('/getDeal', deal_controller.getDeal);

    router.post('/watchDeal', deal_controller.watchDeal);

    return router;
}