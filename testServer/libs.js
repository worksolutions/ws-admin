const axios = require("axios");
const ramda = require("ramda");

exports.error = function (msg, errors = {}) {
  return {
    success: false,
    message: msg,
    errors,
  };
};

exports.prepareUrl = function (url) {
  return url.startsWith("http") ? url : process.env.DEV_API_HOST + url;
};

exports.makeProxy = function ({ expressMethodHandlerName, handleUrl, realServerUrl }, app, modifyResponse) {
  app[expressMethodHandlerName](handleUrl, (req, res) => {
    let chunks = "";
    req.on("data", (chunk) => {
      chunks += chunk;
    });
    req.on("end", async () => {
      try {
        const response = await axios(realServerUrl || req.originalUrl, {
          method: req.method,
          params: req.query,
          baseURL: process.env.DEV_API_HOST,
          data: chunks,
          headers: {
            ...ramda.omit(["host"], req.headers),
            origin: process.env.DEV_API_HOST,
          },
        });
        if (modifyResponse) {
          const result = await modifyResponse(response.data, response.status);
          if (!ramda.isNil(result)) {
            response.data = result;
          }
        }
        res.status(response.status).send(response.data);
      } catch (e) {
        const { response } = e;
        if (!response) {
          console.log(e);
          res.status(500).json(error("proxy - internal server error"));
          return;
        }
        res.status(response.status).send(response.data);
      }
    });
  });
};
