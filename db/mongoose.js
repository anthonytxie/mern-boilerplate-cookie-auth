const mongoose = require("mongoose");

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/survey-app-development";

mongoose.connect(MONGODB_URI, () => {
	console.log("Connected to MongoDB");
});
mongoose.Promise = global.Promise;
