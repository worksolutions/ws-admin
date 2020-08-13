const fs = require("fs");
const { join } = require("path");
const YAML = require("json2yaml");

const config = require("../src/dataProviders/FakeDataProvider/responses/main-config");

fs.writeFileSync(join(__dirname, "../main-config.yml"), YAML.stringify(config));

console.log("Converted");
