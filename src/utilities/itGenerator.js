module.exports = function (stream) {
  var sanitizeQuotes = function (value) {
    value = value || "";
    return value.replace(/"/gi, '\\"');
  };
  var generatePxIt = function (itClass) {
    const sanitizedValue = sanitizeQuotes(itClass.value);
    const sanitizedSelector = sanitizeQuotes(itClass.selector);
    var it = `it("${sanitizedSelector} should have a ${itClass.property}: ${sanitizedValue}", async function() {
		const selector = "${sanitizedSelector}";
		const cssProperty = "${itClass.property}";
		const val = await kisk.getCSSProperty(page, selector, cssProperty);

		expect(val).to.eql("${sanitizedValue}");
});\n\r`;
    stream.write(it);
  };

  var generatePctIt = function (itClass) {
    const sanitizedValue = sanitizeQuotes(itClass.value);
    const sanitizedSelector = sanitizeQuotes(itClass.selector);
    var it = `it("${sanitizedSelector} should have a ${itClass.property}: ${sanitizedValue}", async function() {
		const selector = "${sanitizedSelector}";
		const cssProperty = "${itClass.property}";
		const val = await kisk.getPctCSSProperty(page, selector, cssProperty);

		expect(val).to.eql("${sanitizedValue}");
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
    },
  };
};
