const mongoose = require("mongoose");

//todo Models
const todoSchema = new mongoose.Schema({
	task: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	duedate: {
		type: Date,
		required: true,
	},
});

const Todo = new mongoose.model("todo", todoSchema);
module.exports = Todo;
