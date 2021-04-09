const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + "/dist/steam-stats";
const app = express();
const port = process.env.PORT || 8083;

const authRoutesPath = "./dist/steam-stats/assets/steam-server/routes-steam.js"
// "./steam-serve/steam-routes/routes-steam.js";
const csgoStatsPath = "./dist/steam-stats/assets/steam-server/csgo-stats.js"
// "./steam-serve/steam-routes/csgo-stats.js";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static(path));

const steamRoutes = require(authRoutesPath)(app);
const csGoRoutes = require(csgoStatsPath)(app);
app.get("/*", (req, res) => {
  res.sendFile(path.join(path + "/index.html"));
});

app.listen(port, () => {
//  console.log("Environment" + environment);
  console.log("App listening on http://localhost:" + port);
});
