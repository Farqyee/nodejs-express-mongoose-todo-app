const mongoose = require("mongoose");
const dbURI = process.env.db_uri;
const User = require("../models/user");
const Todo = require("../models/todo");

async function connectDB() {
	try {
		const db = await mongoose.connect(dbURI);
		return db;
	} catch (error) {
		console.error(error.message);
		return;
	}
}

//User
async function checkUsername(username) {
	try {
		const result = await User.find({ username });
		if (result.length > 0) {
			return true;
		}
		return false;
	} catch (error) {
		return true;
	}
}

async function checkEmail(email) {
	try {
		const result = await User.find({ email });
		if (result.length > 0) {
			return true;
		}
		return false;
	} catch (error) {
		return true;
	}
}

//login
async function loginDb(loginData) {
	try {
		const user = User.findOne(
			{ username: loginData.username } || { email: loginData.email }
		);
		if (!user.length > 0) {
			console.log("here");
			throw new Error("Wrong Username/Email");
		}
		return user;
	} catch (error) {
		console.error("error in DB login", error);
		return false;
	}
}

//Todo
async function getTodos() {
	try {
		const result = Todo.find();
		return result;
	} catch (error) {
		console.error("error in DB get Todo", error);
		return error;
	}
}
async function insertTodo(data) {
	try {
		const todo = new Todo(data);
		const result = await todo.save();
		console.log(result);
	} catch (error) {
		console.error("error in DB insert Todo", error);
		return error;
	}
}
async function updateTodo(data, filter) {
	try {
		filter._id = new mongoose.Types.ObjectId(filter._id);
		delete data._id;
		const result = await Todo.findOneAndUpdate(filter, data);
		console.log(JSON.stringify(data));
		console.log(JSON.stringify(filter));
		return result;
	} catch (error) {
		console.error("error in DB update Todo", error);
		return error;
	}
}
async function deleteTodo(filter) {
	try {
		filter._id = new mongoose.Types.ObjectId(filter._id);
		const result = await Todo.findOneAndDelete(filter);
		return result;
	} catch (error) {
		console.error("error in DB delete Todo", error);
		return false;
	}
}

module.exports = {
	connectDB,
	checkUsername,
	checkEmail,
	insertTodo,
	getTodos,
	updateTodo,
	deleteTodo,
	loginDb,
};
