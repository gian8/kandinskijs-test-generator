const fs = require("fs");
const csstree = require("css");
const debug = require("debug");
const dbg = debug("kandinskijs:kGenerator");
const it = require("../src/utilities/itGenerator");
const ruleInterpreter = require("../src/utilities/ruleInterpreter");

module.exports = {
	cssFile: undefined,
	interpreter: undefined,
	outDir: "testSuite",
	init: function (cssPath, outDir) {
		if (!cssPath) {
			throw new Error("cssPath is undefined");
		}
		this.cssFile = getCssFile(cssPath);
		this.outDir = outDir || this.outDir;
		createOutDir(this.outDir);

		this.interpreter = new ruleInterpreter(new it());
	},
	getRules: function (opts) {
		//opts will be a set of key value functions
		var ast = csstree.parse(this.cssFile);
		if (ast.stylesheet) {
			ast.stylesheet.rules.forEach(rule => {

				if (rule.type == "rule") {
					this.interpreter.getRule(rule);
				}

				if (rule.type == "media") {
					this.interpreter.getMediaquery(rule);
				}

			});

			let rulesByVw = this.interpreter.getRulesByViewport(this.interpreter._rules);
			return rulesByVw;
		}
	},
	generateTest: function (rules) {
		let rulesByVw = this.getRules();

		rulesByVw.forEach(r => {
			const fileName = r.key.replace(/(:|\s|@)+/gm, "_");
			const wstream = fs.createWriteStream(`${this.outDir}/${fileName}.js`);
			wstream.write(`/*------------ Test cases scaffolding for ${r.key} viewport ----------------*/\n\n\r`);
			//describe
			wstream.write(`const kisk = require("kandinskijs");\n\n\r`);
			wstream.write(`describe("${r.key} css test", function() {
				const url = "${process.env.URL}";
				const localCssPath = "${process.env.CSS_PATH}";

				before(async function() {
					await kisk.init(this, url, localCssPath);
					await kisk.getPage({ width: 320, height: 568 });
				});

				after(async function() {
					await kisk.destroy();
					await kisk.closePage();
				});\n\n\r`);
			r.value.forEach(v => {
				const itGen = new it(wstream);
				itGen.generateIt(v);
			});
			wstream.write("});");
			wstream.end();
		});
	}
};

function getCssFile (cssPath) {
	if (!fs.existsSync(cssPath)) {
		throw new Error("cssPath is not found");
	}
	return fs.readFileSync(cssPath, "utf8");
};

function createOutDir (outDir) {
	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir);
	}
};



