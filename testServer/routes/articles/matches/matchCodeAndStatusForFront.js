const matchCodeAndBadgeColor = require("./matchCodeAndBadgeColor");

module.exports = {
  0: { status: { icon: { color: matchCodeAndBadgeColor[0] }, value: "Черновик" } },
  1: { status: { icon: { color: matchCodeAndBadgeColor[1] }, value: "Опубликовано" } },
  2: { status: { icon: { color: matchCodeAndBadgeColor[2] }, value: "Не опубликовано" } },
};
