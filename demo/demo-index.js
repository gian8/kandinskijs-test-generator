const generator = require("../src/kGenerator");

const CSS_PATH = process.env.CSS_PATH || "demo/base.css";
const OUT_DIR = process.env.OUT_DIR || "testSuite";
generator.init(CSS_PATH, OUT_DIR);
generator.generateTest();
console.log(`Created tests for '${CSS_PATH}' in '${OUT_DIR}'`);
