var fs = require("fs");
var csstree = require("css-tree");

module.exports = {
	cssFile: undefined,
	outDir: "testSuite",
	init: function (cssPath, outDir) {
		if (!cssPath) {
			throw new Error("cssPath is undefined");
		}
		this.cssFile = getCssFile(cssPath);
		this.outDir = outDir || this.outDir;
		createOutDir(this.outDir);
	},
	generate: function (opts) {
		//opts will be a set of key value functions
		var ast = csstree.parse(this.cssFile);
		if (ast.type != "StyleSheet") {
			throw new Error("File is not StyleSheet format");
		}
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