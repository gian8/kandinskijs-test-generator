let itClas = class itClass {
	constructor(selector, property, value) {
		this.selector = selector;
		this.property = property;
		this.value = value;
		this.valueType = this.getValueType(value);
	}

	getValueType (value) {
		const regex = /(%)+/gm;
		const isPerc = regex.test(value);
		return isPerc ? "perc" : "px";
	}
};

module.exports = itClas