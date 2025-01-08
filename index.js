const helmet = require("helmet");
const Joi = require("joi");
const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const courses = require("./routes/courses");
const home = require("./routes/home");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

// Db work...
//dbDebugger('connected to the database...')

console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny "));
app.use("/api/cou", courses);
app.use("/", home);

app.use(logger);

console.log("Application name" + config.get("name"));
console.log("Mail server" + config.get("mail.host"));

app.get("/api/course", (req, res) => {
  res.send([1, 2, 3, "hello"]);
});

//params
app.get("/api/course/:id", (req, res) => {
  res.send(req.params.id);
});

//query string
app.get("/api/course/:year", (req, res) => {
  res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});
