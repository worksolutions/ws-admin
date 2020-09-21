const multer = require("multer");
const storage = multer.memoryStorage();
const FormData = require("form-data");

const { makeProxy, prepareUrl } = require("../../libs");

module.exports = (app) => {
  makeProxy(
    {
      realServerUrl: "/api/file_storage/store",
      expressMethodHandlerName: "post",
      handleUrl: "/api/file_storage/store",
    },
    app,
    {
      middlewares: [multer({ storage }).single("file")],
      modifyRequest: ({ request, headers }) => {
        const form = new FormData();
        form.append("file", request.file.buffer, request.file.originalname);
        return { data: form.getBuffer(), headers: { ...headers, ...form.getHeaders() } };
      },
      modifyResponse: ({ data }) => {
        return {
          id: data.id,
          path: prepareUrl(data.path),
        };
      },
    },
  );
};
