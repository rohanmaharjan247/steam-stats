const express = require("express");
const cors = require("cors");
const path = __dirname + "/dist/steam-stats/";
const app = express();
const port = process.env.PORT || 8083;

const environment = process.env.NODE_ENV || "development";

const authRoutesPath = (environment === "development")? "./steam-serve/steam-routes/routes-steam" : "./assets/routes-steam";
const csgoStatsPath = (environment === "development")? "./steam-serve/steam-routes/routes-steam" : "./assets/csgo-stats";

app.use(cors());
app.use(express.static(path));

const steamRoutes = require("./steam-serve/steam-routes/routes-steam")(app);
const csGoRoutes = require("./steam-serve/steam-routes/csgo-stats")(app);
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.listen(port, () => {
//  console.log("Environment" + environment);
  console.log("App listening on http://localhost:" + port);
});
