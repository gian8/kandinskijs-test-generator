var fs = require("fs");

module.exports = function (stream) {
	var generatePxIt = function (itClass) {
		var it = `it("${itClass.selector} should have a ${itClass.property}: ${itClass.value}", async function() {
		const selector = "${itClass.selector}";
		const cssProperty = "${itClass.property}";
		const val = await kisk.getCSSProperty(page, selector, cssProperty);

		expect(val).to.eql("${itClass.value}");
});\n\r`;
		stream.write(it);
	};

	var generatePctIt = function (itClass) {
		var it = `it("${itClass.selector} should have a ${itClass.property}: ${itClass.value}", async function() {
		const selector = "${itClass.selector}";
		const cssProperty = "${itClass.property}";
		const val = await kisk.getPctCSSProperty(page, selector, cssProperty);

		expect(val).to.eql("${itClass.value}");
});\n\r`;
		stream.write(it);
	};

	return {
		generateIt: function (itClass) {
			if (itClass.valueType == "px") {
				generatePxIt(itClass);
			}

			if (itClass.valueType == "perc") {
				generatePctIt(itClass);
			}
		}
	}
};