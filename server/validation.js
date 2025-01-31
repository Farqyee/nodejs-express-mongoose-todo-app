const {
	oneOf,
	body,
	validationResult,
	checkSchema,
} = require("express-validator");
const { checkUsername, checkEmail } = require("./database");

//Custom Validation
const usernameInUse = async (value) => {
	const isUsed = await checkUsername(value);
	if (isUsed) throw new Error("username is already in use");
};
const emailInUse = async (value) => {
	const isUsed = await checkEmail(value);
	if (isUsed) throw new Error("Email is already in use");
};
const dueDateVariable = () => {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	return date.toISOString().split("T")[0];
};

//Validation schema
const validateRegisterSchema = checkSchema({
	username: {
		escape: true,
		notEmpty: {
			errorMessage: "Username is required",
			bail: true,
		},
		trim: true,
		isString: true,
		custom: {
			options: usernameInUse,
		},
	},
	email: {
		escape: true,
		notEmpty: {
			errorMessage: "Email is required",
			bail: true,
		},
		trim: true,
		isEmail: { errorMessage: "Masukkan email yang valid" },
		custom: {
			options: emailInUse,
		},
	},
	password: {
		escape: true,
		notEmpty: {
			errorMessage: "Password required",
		},
		isString: true,
		isLength: {
			options: { min: 8 },
			errorMessage: "Password minimal 8 karakter",
		},
	},
});

const validateLogin = checkSchema({
	username: {
		notEmpty: { errorMessage: "Username or Email is required" },
		isString: true,
		trim: true,
		escape: true,
	},
	password: {
		notEmpty: true,
		trim: true,
		isString: true,
		escape: true,
		isLength: {
			options: { min: 8 },
			errorMessage: "Password minimal 8 karakter",
		},
	},
});

const validateTodo = checkSchema({
	task: {
		notEmpty: true,
		isString: true,
		escape: true,
	},
	description: {
		isString: true,
		notEmpty: true,
		escape: true,
	},
	completed: {
		optional: true,
		isBoolean: true,
	},
	duedate: {
		isISO8601: true,
		isAfter: {
			options: { comparisonDate: dueDateVariable() },
			errorMessage: "Due date must be today or after today",
		},
	},
});

//function validation
const isUsernameOrEmail = oneOf(
	[
		body("username")
			.isEmail()
			.bail()
			.escape()
			.custom((value, { req }) => {
				req.body.email = value;
			}),
		body("username").notEmpty().escape().isString(),
	],
	{ message: "Input Username or Email" }
);

// validation error handling
function validateHandling(req, res, next) {
	const resultValidation = validationResult(req);
	if (!resultValidation.isEmpty()) {
		console.log(resultValidation);
		return res.status(400).json(resultValidation);
	}
	next();
}
module.exports = {
	validateRegisterSchema,
	validateLogin,
	isUsernameOrEmail,
	validateHandling,
	validateTodo,
};
