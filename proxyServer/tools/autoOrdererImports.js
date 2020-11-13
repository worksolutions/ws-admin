const fs = require("fs");
const path = require("path");
const {
  groupBy,
  toPairs,
  sortBy,
  startsWith,
  join,
  prop,
  compose,
  map
} = require("ramda");

const importsRegexp = /^import\s.+?;/gms;

const config = {
  rootDir: path.join(__dirname, "src/"),
  simplifiedRootDirs: [
    "assets",
    "modules",
    "services",
    "libs",
    "types",
  ],
  importOrders: [
    { pattern: "^assets/", order: 1 },
    { pattern: "^modules/", order: 2 },
    { pattern: "^services/", order: 3 },
    { pattern: "^libs/", order: 4 },
    { pattern: "^types/", order: 5 },
    { pattern: "^./", order: 10 },
    { pattern: "^../", order: 10 },
    { pattern: "", order: 0 }
  ]
};

function getImportPath(codeLine) {
  let matches = codeLine.match(new RegExp('(?<=from ").+(?=")', "gm"));
  if (!matches || matches.length === 0) {
    matches = codeLine.match(new RegExp('(?<=import ").+(?=")', "gm"));
  }
  return matches && matches.length > 0 ? matches[0] : null;
}

function groupedImportsByOrders(imports) {
  return compose(
    map(prop("1")),
    sortBy((el) => parseFloat(el[0])),
    toPairs,
    groupBy((imp) => {
      const fromStr = getImportPath(imp);
      if (!fromStr) return imp;
      const orderGroup = config.importOrders.find((el) =>
        fromStr.match(el.pattern)
      );
      return orderGroup.order.toString();
    })
  )(imports);
}

/**
 *
 * @param {string[]} imports
 * @param {string} filePath
 * @return {string[]}
 */
function simplifyPaths(imports, filePath) {
  return imports.map((imp) => {
    const fromStr = getImportPath(imp);
    if (!fromStr) return imp;
    if (!startsWith(".", fromStr)) return imp;
    const pathFromRoot = filePath.replace(config.rootDir, "");
    const level = (pathFromRoot.match(/\//g) || []).length;
    const importLevel = (fromStr.match(/\.\.\//g) || []).length;
    if (level !== importLevel) return imp;
    const simplifiedPath = imp.replace(/\.\.\//g, "");

    const clearedFromStr = getImportPath(simplifiedPath);
    const isNeedSimplified = !!config.simplifiedRootDirs.find((dirName) =>
      clearedFromStr.startsWith(dirName)
    );
    return isNeedSimplified ? simplifiedPath : imp;
  });
}

function rewriteFile(filePath, cb, errorHandler) {
  const code = fs.readFileSync(filePath, "utf8");
  fs.writeFile(filePath, cb(code), (errorText) => {
    if (errorText) errorHandler(errorText);
  });
}

/**
 * @param {string} code
 * @param {string} filePath
 */
function updateImportOrders(code, filePath) {
  const imports = Array.from(code.matchAll(importsRegexp)).map((el) => el[0]);
  if (!imports) return code;
  const contentCode = code.replace(importsRegexp, "").trimStart();
  const importsPart = compose(
    join("\n\n"),
    map((group) => group.join("\n")),
    groupedImportsByOrders,
    (imports) => simplifyPaths(imports, filePath)
  )(imports);

  if (importsPart) {
    return `${importsPart}\n\n${contentCode}`;
  }
  return contentCode;
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
      return ["ts", "tsx", "js", "jsx"].includes(ext);
    })
    .forEach((file) => {
      try {
        rewriteFile(
          file,
          (code) => updateImportOrders(code, file),
          console.error
        );
      } catch (e) {
        console.error("error in file", file, e);
      }
    });
} else {
  args.forEach((filePath) => {
    rewriteFile(
      filePath,
      (code) => updateImportOrders(code, filePath),
      console.error
    );
  });
}
