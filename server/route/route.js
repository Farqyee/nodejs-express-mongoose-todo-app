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
const limiter = require("express-rate-limit");
const { createToken } = require("../authentication/auth");
const { errorLogger } = require("../helper");

const requestLimiter = limiter({
	max: 5,
	windowMs: 1 * 60 * 1000,
	message: "Too much attempt, try again later",
	standardHeaders: true,
	legacyHeaders: false,
});

const routeUpdateTodo = async (req, res) => {
	try {
		const result = await updateTodo(
			req.body,
			{ _id: req.body._id },
			{ new: true }
		);
		res.status(200).json(result);
	} catch (error) {
		errorLogger(req, res, error);
	}
};
const routeInsertTodo = async (req, res) => {
	try {
		await insertTodo(req.body);
		res.status(200).json(req.body);
	} catch (error) {
		errorLogger(req, res, error);
	}
};
const routeGetTodos = async (req, res) => {
	try {
		const result = await getTodos();
		res.status(200).json(result);
		console.log(JSON.stringify(result));
	} catch (error) {
		errorLogger(req, res, error);
	}
};
const routeDeleteTodo = async (req, res) => {
	try {
		const result = await deleteTodo(req.body);
		res.status(200).json(result);
	} catch (error) {
		errorLogger(req, res, error);
	}
};

//auth
const routeLogin = async (req, res) => {
	try {
		console.log(JSON.stringify(req.body));
		const userQuery = { username: req.body.username };
		if (req.body.email) {
			// delete req.body.username;
			userQuery.email = req.body.email;
			delete userQuery.username;
		}
		console.log(`setelah kondisi : ${JSON.stringify(req.body)}`);

		const isAuth = await loginDb(userQuery);
		if (!isAuth) {
			return res.status(400).json({ message: "Wrong Username or Email" });
		}
		if (!(await bcrypt.compare(req.body.password, isAuth.password))) {
			console.log(await bcrypt.compare(req.body.password, isAuth.password));
			return res.status(400).json({
				message: "Wrong Password",
			});
		}
		const userPayload = { email: isAuth.email, username: isAuth.username };
		const user = await createToken(userPayload);
		res.status(200).json({ body: req.body, message: user });
	} catch (error) {
		errorLogger(req, res, error);
	}
};

const routeRegister = async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = new User(req.body);
		const result = await user.save();
		res.status(200).json(result);
	} catch (error) {
		errorLogger(req, res, error);
	}
};

module.exports = {
	routeInsertTodo,
	routeUpdateTodo,
	routeDeleteTodo,
	routeGetTodos,
	routeRegister,
	routeLogin,
	requestLimiter,
};
