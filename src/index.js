const isArray = Array.isArray

const isObject = value => Object.prototype.toString.call(value) === '[object Object]'

function _sortObjectCircular(input, inputs, outputs) {
	// Immediately return values that do not have properties. 
	if (!isArray(input) && !isObject(input)) return input

	// Check if result already computed.
	const index = inputs.indexOf(input)
	if (index !== -1) return outputs[index]

	// Create an output reference.
	const output = isArray(input) ? [] :
		Object.create(Object.getPrototypeOf(input))

	// Store the input and output so they are used while recursively sorting nested objects. 
	inputs.push(input)
	outputs.push(output)

	// Copy keys from input to output in a sorted manner. 
	Object.keys(input).sort().forEach(key => {
		output[key] = _sortObjectCircular(input[key], inputs, outputs)
	})

	return output
}

function sortObjectCircular(input) {
	return _sortObjectCircular(input, [], [])
}

export default sortObjectCircular
