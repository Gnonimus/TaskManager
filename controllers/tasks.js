var mongoose = require('mongoose');
var Task = mongoose.model('Task');

/* GET - Return all Tasks */
exports.findAllTasks = function (req, res) {
    Task.find(function (err, tasks) {
        if (err) return res.status(500).send(err.message);
        res.render('tasks', {title: "Tasks Manager", tasks: tasks});
    });
};

/* POST - Insert a new task */
exports.addTask = function (req, res) {
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        date: Date.now(),
        made: false
    });
    task.save(function (err, task) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(task);
    });
};

/* GET - Update task */
exports.makeTaskMade = function (req, res) {
    Task.findById(req.params.id, function (err, task) {
        if (err) return res.status(500).send(err.message);
        task.made = true;
        task.save(function (err) {
            if (err) return res.status(500).send(err.message);
            res.redirect('/');
        });
    });
};

/* GET - Delete task */
exports.deleteTask = function (req, res) {
    Task.findById(req.params.id, function (err, task) {
        task.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.redirect('/');
        })
    });
};
