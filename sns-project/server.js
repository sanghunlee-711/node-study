const app = require("./app");

app.listen(app.get("port"), (req, res) => {
  console.log(app.get("port"), "번에서 대기중");
});
