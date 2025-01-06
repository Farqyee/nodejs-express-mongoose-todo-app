const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

//import modules
const { connectDB } = require("./database");
const routeHandling = require("./route/route");
const validationModule = require("./validation");

//set view engine ke embedded javaScript
app.set("view engine", "ejs");

// Middleware untuk meng-handle JSON input menjadi object
app.use(express.json());

// Middleware untuk file static
app.use(express.static("./public"));

// Route Utama
app.get("/", (req, res) => {
	res.render("auth", { username: "tes doang" });

	//untuk mengirimkan file
	// res.sendFile(
	// 	path.join(path.resolve(__dirname, ".."), "public", "formLogin.html")
	// );
});

//Handling syntax JSON Error
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
		return res.status(400).json({ error: "Invalid JSON Format" });
	}
	next();
});

//register
app.post(
	"/register",
	validationModule.validateRegisterSchema,
	validationModule.validateHandling,
	routeHandling.routeRegister
);

//login
app.post(
	"/login",
	validationModule.validateLogin,
	validationModule.isUsernameOrEmail,
	validationModule.validateHandling,
	routeHandling.loginLimiter,
	routeHandling.routeLogin
);

//todo
app
	.route("/todo")
	.post(
		validationModule.validateTodo,
		validationModule.validateHandling,
		routeHandling.routeInsertTodo
	)
	.get(routeHandling.routeGetTodos)
	.put(
		validationModule.validateTodo,
		validationModule.validateHandling,
		routeHandling.routeUpdateTodo
	)
	.delete(routeHandling.routeDeleteTodo);

//Initiate DB and Server
async function startServer() {
	try {
		const db = await connectDB();
		if (!db) throw new Error("Error connecting DB");
		console.log("DB CONNECTED");
		app.listen(process.env.PORT, () =>
			console.log(`Server Running on port ${process.env.PORT}`)
		);
	} catch (error) {
		console.log(error.message);
	}
}
startServer();
