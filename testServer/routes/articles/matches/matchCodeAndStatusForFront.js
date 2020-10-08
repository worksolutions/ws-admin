const matchCodeAndStatusOptions = require("./matchCodeAndStatusOptions");

module.exports = {
  0: { status: { icon: { color: matchCodeAndStatusOptions[0].badgeColor }, value: "Черновик" } },
  1: { status: { icon: { color: matchCodeAndStatusOptions[1].badgeColor }, value: "Опубликовано" } },
  2: { status: { icon: { color: matchCodeAndStatusOptions[2].badgeColor }, value: "Не опубликовано" } },
};
