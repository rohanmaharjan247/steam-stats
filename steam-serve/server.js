const express = require("express");
const cors = require("cors");
const path = __dirname + "/dist/steam-stats/";
const app = express();
const port = process.env.PORT || 8083;


app.use(cors());
app.use(express.static(path));

const steamRoutes = require("./steam-routes/routes-steam")(app);
const csGoRoutes = require("./steam-routes/csgo-stats")(app);
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.listen(port, () => {
//  console.log("Environment" + environment);
  console.log("App listening on http://localhost:" + port);
});
