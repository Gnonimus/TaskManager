var express = require('express');
var router = express.Router();
var TaskCtrl = require('../controllers/tasks');

/* GET - Find all Tasks. */
router.get('/', function (req, res, next) {
    TaskCtrl.findAllTasks(req, res);
});

/* POST - Add new Task. */
router.post('/add', function (req, res, next) {
    TaskCtrl.addTask(req, res);
});

/* GET - Update Task. */
router.get('/update/:id', function (req, res, next) {
    TaskCtrl.makeTaskMade(req, res);
});

/* GET - Delete Task. */
router.get('/delete/:id', function (req, res, next) {
    TaskCtrl.deleteTask(req, res);
});

module.exports = router;
