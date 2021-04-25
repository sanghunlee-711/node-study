const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

//for env package controll
dotenv.config();
const indexRouter = require("./routes");
const mysqlRouter = require("./routes/mysql");
const app = express();

app.set("port", process.env.PORT || 4000);
// app.set("views", path.join(__dirname, "views"));

//for recording O/A
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//for parsing buffer or stream
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use("/", indexRouter);
app.use("/mysql", mysqlRouter);
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중 :)");
});
