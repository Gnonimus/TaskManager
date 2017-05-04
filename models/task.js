
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: {type: String},
    description: {type: String},
    date: {type: Date},
    made: {type: Boolean}
});

module.exports = mongoose.model('Task', taskSchema);