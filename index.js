var fs = require('fs');
var path = require('path');

var elementParser = require('./parser/api_example');
var schemas = {
	'json': require('./schema/json'),
	'jsonschema': require('./schema/jsonschema')
};

module.exports = function(element, filename) {
	var values = elementParser.parse(element.content, element.source);
	if (schemas[values.schema]) {
		var data = fs.readFileSync( path.join(path.dirname(filename), values.path), 'utf8').toString();
		return schemas[values.schema](data, values.element, values.title);
	}
	return '';
};