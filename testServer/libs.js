const axios = require("axios");
const ramda = require("ramda");
const path = require("path");

const API_HOST = process.env.DEV_API_HOST;

function prepareUrl(url) {
  return url.startsWith("http") ? url : API_HOST + url;
}

exports.error = function (msg, errors = {}) {
  return {
    success: false,
    message: msg,
    errors,
  };
};

exports.prepareUrl = prepareUrl;

// eslint-disable-next-line max-params
exports.makeProxy = function (
  { expressMethodHandlerName, handleUrl, realServerUrl },
  app,
  { middlewares = [], modifyResponse, modifyRequest, modifyError } = {},
) {
  app[expressMethodHandlerName](handleUrl, ...middlewares, async (req, res) => {
    try {
      const resultUrl = (ramda.is(Function, realServerUrl) ? realServerUrl(req) : realServerUrl) || req.originalUrl;
      const headers = {
        ...ramda.omit(["host"], req.headers),
        origin: API_HOST,
      };
      const requestParams = {
        method: req.method,
        baseURL: API_HOST,
        params: req.query,
        data: req.body,
        headers,
      };
      Object.assign(
        requestParams,
        modifyRequest ? await modifyRequest({ urlParams: req.params, requestParams, request: req }) : {},
      );
      const response = await axios(resultUrl, requestParams);

      if (modifyResponse) {
        const result = await modifyResponse(response.data, {
          status: response.status,
          resultUrl,
          originalRequestParams: requestParams,
        });
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
      res.status(response.status);
      if (modifyError) {
        const newData = modifyError(response.data);
        res.send(ramda.isNil(newData) ? response.data : newData);
        return;
      }
      res.send(response.data);
    }
  });
};

exports.convertServerErrorsToClientErrors = function (errors) {
  if (!errors) return {};
  return Object.fromEntries(Object.entries(errors).map(([key, value]) => [key, value[0]]));
};

const fakeConfigFolder = "/src/dataProviders/FakeDataProvider/responses";

exports.configPath = require.resolve(path.join("..", fakeConfigFolder, "main-config.js"));

exports.removeConfigCache = function () {
  Object.keys(require.cache).forEach((key) => {
    if (!key.includes(fakeConfigFolder)) return;
    delete require.cache[key];
  });
};

exports.prepareUserProfileToFront = function ({ user }) {
  if (!user.image) return;
  const imagePath = prepareUrl(user.image.path);

  user.firstName = user.name;
  user.blocked = !user.active;
  user.avatar = imagePath;
  user.image = { ...user.image, path: imagePath };
  user.name = `${user.name} ${user.surname}`;
  user.postName = user.position;
  user.customFields = [{ title: "Должность", type: "text", options: { value: user.postName } }];
  return user;
};
