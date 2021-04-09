const SteamAuth = require("node-steam-openid");
const queryString = require("querystring");
const fs = require('fs');
const apiKey = "7B347DB44FFBA7A85E106F6301658552";
const environment = process.env.NODE_ENV || "development";

const steam = new SteamAuth({
  realm: (environment === "development")? "http://localhost:8083" : "https://game-stats-steam.herokuapp.com", // Site name displayed to users on logon
  returnUrl: (environment === "development")? "http://localhost:8083/auth/steam/authenticate": "https://game-stats-steam.herokuapp.com/auth/steam/authenticate", // Your return route
  apiKey: apiKey, // Steam API key
});

routes = (app) => {
  app.get("/test", (req, res) => {
    res.send(JSON.stringify("test successful"));
  });

  app.get("/auth/steam", async (req, res) => {
    const redirectUri = await steam.getRedirectUrl();

    return res.send(JSON.stringify(redirectUri));
  });

  app.get("/auth/steam/authenticate", async (req, res) => {
    try {
      const user = await steam.authenticate(req);
      const query = queryString.stringify({
        steamid: user.steamid,
      });
      res.redirect("/#/profile?" + query);
    } catch (error) {
      const query = queryString.stringify({
        failure: error,
      });
      res.redirect("/#/profile?" + query);
      console.error(error);
    }
  });
};

module.exports = routes;
