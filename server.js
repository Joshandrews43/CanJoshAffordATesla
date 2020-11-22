//server.js
var data = require("./getData.js");
var express = require("express");
const app = express();
var router = express.Router();
var path = require("path");

console.log("We're live.");

app.use("/static", express.static(__dirname + "/public"));

router.get("/", function (req, res) {
  res.render("index", { title: "CJAAT" });
});

app.use("/", router);

app.set("views", __dirname + "/html");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

router.post("/xrp", async (req, res) => {
  console.log("got request");
  const prices = await data.getPrices();
  res.send({ prices });
});

// Use the environment variable or use a given port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:%s", PORT);
});
