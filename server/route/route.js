//Todo
const {
	insertTodo,
	updateTodo,
	getTodos,
	deleteTodo,
	loginDb,
} = require("../database");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const routeUpdateTodo = async (req, res) => {
	try {
		const result = await updateTodo(
			req.body,
			{ _id: req.body._id },
			{ new: true }
		);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};
const routeInsertTodo = async (req, res) => {
	try {
		await insertTodo(req.body);
		res.status(200).json(req.body);
	} catch (error) {
		return console.log(error);
	}
};
const routeGetTodos = async (req, res) => {
	try {
		const result = await getTodos();
		res.status(200).json(result);
		console.log(JSON.stringify(result));
	} catch (error) {
		res.status(500).json(error);
	}
};
const routeDeleteTodo = async (req, res) => {
	try {
		const result = await deleteTodo(req.body);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

//auth
const routeLogin = async (req, res) => {
	try {
		console.log(JSON.stringify(req.body));
		if (req.body.email) {
			delete req.body.username;
		}
		const encrypted = await bcrypt.hash(req.body.password, 10);
		req.body.password = encrypted;
		console.log(`setelah kondisi : ${JSON.stringify(req.body)}`);

		const isAuth = await loginDb(req.body);
		if (!isAuth) {
			return res.status(400).json({ message: "Bad Request" });
		}

		res.status(200).json(req.body);
	} catch (error) {
		res.status(500).json(error);
	}
};

const routeRegister = async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = new User(req.body);
		const result = await user.save();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {
	routeInsertTodo,
	routeUpdateTodo,
	routeDeleteTodo,
	routeGetTodos,
	routeRegister,
	routeLogin,
};
