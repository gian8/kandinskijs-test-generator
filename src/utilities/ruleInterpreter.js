const debug = require("debug");
const dbg = debug("kandinskijs:ruleInterpreter");
const itClass = require("../utilities/itClass");

module.exports = function () {
	return {
		_rules: new Array(),
		_rulesByType: new Array(),
		getRule: function (rule) {
			if (!rule) {
				throw new Error("rule is not defined");
			}
			rule.selectors.forEach(selector => {
				let property, value;
				rule.declarations.forEach(declaration => {
					property = declaration.property;
					value = declaration.value;
					const it = new itClass(selector, property, value);
					const obj = {
						key: "global",
						value: it
					}
					this._rules.push(obj);
				})
			})
		},
		getMediaquery: function (rule) {
			if (!rule) {
				throw new Error("rule is not defined");
			}
			rule.rules.forEach(r => {
				if (r.type == "rule") {
					r.selectors.forEach(selector => {
						r.declarations.forEach(declaration => {
							const it = new itClass(selector, declaration.property, declaration.value);
							let obj = {
								key: rule.media,
								value: it
							};
							this._rules.push(obj);
						})
					})
				}
			});
		},
		getRulesByViewport: function (rules) {
			let keysPresent = [];
			rules.forEach(r => {
				if (!this._rulesByType.length) {
					var ob = {
						key: r.key,
						value: [r.value]
					}
					this._rulesByType.push(ob);
					keysPresent.push(r.key);
				}

				var keyIsPresent = keysPresent.find(x => {
					if (x == r.key) {
						return true;
					}
					else {
						return false;
					}
				});

				if (keyIsPresent) {
					var index = this._rulesByType.findIndex(x => {
						return x.key == r.key
					});

					this._rulesByType[index].value.push(r.value);

				} else {
					var ob = {
						key: r.key,
						value: [r.value]
					}
					this._rulesByType.push(ob);
					keysPresent.push(r.key);
				}
			});
			return this._rulesByType;
		}
	}
};