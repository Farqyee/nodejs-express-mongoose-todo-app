const { json } = require("body-parser");
const winston = require("winston");

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf((info) => {
			return JSON.stringify(
				{
					date: info.timestamp,
					requestId: info.requestId,
					error: info.error,
					url: info.url,
					method: info.method,
					stack: info.stack,
				},
				null,
				2
			);
		})
	),
	transports: new winston.transports.File({
		filename: "error.log",
		level: "error",
	}),
});

function errorLogger(req, res, error) {
	logger.error("", {
		requestId: req.requestId,
		error: error.message,
		url: req.originalUrl,
		method: req.method,
		stack: error.stack,
	});

	return res.status(500).json({ message: "Internal System Error" });
}

module.exports = { errorLogger };
