const jwt = require("jsonwebtoken");

async function createToken(user) {
	const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
	return token;
}
const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		return res.status(403).json({ message: "Token Required" });
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		console.log(payload);
		req.user = payload;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or Expired Token" });
	}
};

module.exports = { createToken, verifyToken };
