const mongoose = require("mongoose");

//create Schema
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
		minlength: 8,
		selectFields: false,
	},
});

//create model
const User = new mongoose.model("user", userSchema);
module.exports = User;
