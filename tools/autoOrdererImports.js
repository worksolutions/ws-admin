const fs = require("fs");
const path = require("path");
const { groupBy, toPairs, sortBy, prop, compose, map } = require("ramda");

const importsRegexp = /^import\s.+?;/gms;

const config = {
  importOrders: [
    { pattern: "^primitives/", order: 1 },
    { pattern: "^components/", order: 2 },
    { pattern: "^libs/", order: 3 },
    { pattern: "^projectLibs/", order: 4 },
    { pattern: "^state/.+/(state|store)$", order: 11 },
    { pattern: "^state/", order: 12 },
    { pattern: "^types/", order: 13 },
    { pattern: "^modules/", order: 6 },
    { pattern: "^../", order: 9 },
    { pattern: "^./", order: 10 },
    { pattern: "", order: 0 },
  ],
};

function groupedImportsByOrders(imports) {
  return compose(
    map(prop("1")),
    sortBy((el) => parseFloat(el[0])),
    toPairs,
    groupBy((imp) => {
      let matches = imp.match(/(?<=from ").+(?=")/gm);
      if (!matches || matches.length === 0) {
        matches = imp.match(/(?<=import ").+(?=")/gm);
      }
      const fromStr = matches[0];
      const orderGroup = config.importOrders.find((el) =>
        fromStr.match(el.pattern),
      );
      return orderGroup.order.toString();
    }),
  )(imports);
}

function rewriteFile(filePath, cb, errorHandler) {
  let code = fs.readFileSync(filePath, "utf8");
  fs.writeFile(filePath, cb(code), (errorText) => {
    if (errorText) errorHandler(errorText);
  });
}

function updateImportOrders(code) {
  const matches = code.match(importsRegexp);
  if (!matches) {
    return code;
  }
  const imports = [...matches];
  code = code.replace(importsRegexp, "").trimStart();
  const groups = groupedImportsByOrders(imports);
  return groups.map((group) => group.join("\n")).join("\n\n") + "\n\n" + code;
}

const walkSync = function (dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
};

const args = process.argv.slice(2);
if (args[0] === "-r") {
  const rootDir = path.join(__dirname, "../", args[1]);
  walkSync(rootDir)
    .filter((file) => {
      const ext = file.split(".").pop();
      return ["ts", "tsx"].includes(ext);
    })
    .forEach((file) => {
      try {
        console.log(file);
        rewriteFile(file, updateImportOrders, console.error);
      } catch (e) {
        console.error("error in file", file, e);
      }
    });
} else {
  args.forEach((filePath) => {
    rewriteFile(filePath, updateImportOrders, console.error);
  });
}
