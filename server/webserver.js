// const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/notwordle", (req, res) => {
	res.send("notwordle");
});
app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
// app.use(
//   rateLimit({
//     windowMs: 30000, // 30 seconds
//     max: 500,
//     message: "You exceeded the rate limit.",
//     headers: true,
//   })
// );

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`express server listening on port ${PORT}`);
});
