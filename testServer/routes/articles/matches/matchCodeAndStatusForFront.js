const matchCodeAndStatusOptions = require("./matchCodeAndStatusOptions");

module.exports = {
  0: { icon: { color: matchCodeAndStatusOptions[0].badgeColor }, value: "Черновик" },
  1: { icon: { color: matchCodeAndStatusOptions[1].badgeColor }, value: "Опубликовано" },
  2: { icon: { color: matchCodeAndStatusOptions[2].badgeColor }, value: "Не опубликовано" },
};
