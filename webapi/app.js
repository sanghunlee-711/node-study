const express = require("express");

const app = express();

app.set("port", process.env.PORT || 8000); //save port setting at express instance obj for using 'port' with get method

app.get(app.get("port"), (req, res, next) => {
  console.log(app.get("port"));
  res.send("Hello API");
});
