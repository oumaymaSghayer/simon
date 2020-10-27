const express = require("express");

const app = express();
app.use(express.static(`./dist/simon/`));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/simon/" });
});
app.listen(process.env.PORT || 8080);
