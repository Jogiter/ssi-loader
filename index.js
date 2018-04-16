const loaderUtils = require("loader-utils");
const SSI = require("./lib/ssi");

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
	const ssi = new SSI(options);

	this.cacheable && this.cacheable();

	return ssi.compile(source);
};
