var expect = require("chai").expect;
const kGenerator = require("../src/kGenerator");
const sinon = require("sinon");

describe("kGenerator", function () {
	it("should exist", function () {
		expect(kGenerator).to.be.not.null;
	});


	//
	//Properties declaration
	//
	context("module properties", function () {
		it("should have cssFile property", function () {
			const cssFile = "cssFile";
			expect(kGenerator).to.have.property(cssFile);
		});
		it("should have cssFile property with undefined value as default", function () {
			const cssFile = undefined;
			expect(kGenerator.cssFile).to.be.undefined;
		});
		it("should have outDir property", function () {
			const outDir = "outDir";
			expect(kGenerator).to.have.property(outDir);
		});
		it("should have outDir property with testSuite value as default", function () {
			const outDirValue = "testSuite";
			expect(kGenerator.outDir).to.be.eqls(outDirValue);
		});
	});




	//
	//init()
	//
	context("init()", function () {
		it("should initialize throw Error if cssPath is not defined", function () {
			expect(kGenerator.init.bind(kGenerator)).to.throw('cssPath is undefined');
		});
	});
});