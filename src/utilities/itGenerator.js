var fs = require("fs");

module.exports = function (stream) {
	return {
		generateIt: function (selector, property, value) {
			var it = `it("${selector} should have a ${property}: ${value}", async function() {
      const selector = "${selector}";
      const cssProperty = "${property}";
      const val = await kisk.getCSSProperty(page, selector, cssProperty);

      expect(val).to.eql("${value}");
	});\n\r`;
			stream.write(it);
		}
	}
};