const axios = require("axios");

const csgoApiKey = "0be2692a-794e-4be6-8ebf-9b9b253a2348";
const csgoApiUrl = "https://public-api.tracker.gg/v2/csgo/standard";
const platform = "steam";

csgoStats = (app) => {
  app.get("/player-profile", (req, res) => {
    let steamid = req.query.steamid;
    
    axios
      .get(`${csgoApiUrl}/profile/${platform}/${steamid}`, {
        headers: {
          "TRN-Api-Key": csgoApiKey,
        },
      })
      .then((response) => {        
        res.send(response.data);
      })
      .catch((err) => {
        console.error(err.response);
        res.send(err.response.data);
      });
  });

  app.get("/player-profile-segment", (req, res) => {
    let steamid = req.query.steamid;
    let segmentType = req.query.segment;
    
    axios
      .get(`${csgoApiUrl}/profile/${platform}/${steamid}/segments/${segmentType}`, {
        headers: {
          "TRN-Api-Key": csgoApiKey,
        },
      })
      .then((response) => {        
        res.send(response.data);
      })
      .catch((err) => {
        console.error(err.response);
        res.send(err.response.data);
      });
  });
};

module.exports = csgoStats;
