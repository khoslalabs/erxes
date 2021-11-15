module.exports = function (express) {
  console.log("here-----------------------------------------")
  var router = express.Router()
  // task
  require('./db/models/routes/task_routes')(router);
  //deal
  require('./db/models/routes/deal_routes')(router);
  return router;
}