/* eslint-env mocha */
import expect from 'must'
import relativePath from '../test/relative-path'
import sortObjectCircular from './'

describe(relativePath(__filename), () => {
	it('should export a function', () => {
		expect(sortObjectCircular).to.be.a.function()
	})

	it('should immediately return non-objects', () => {
		expect(sortObjectCircular('hello')).to.eql('hello')
	})

	it('should sort objects', () => {
		const input = { b: 1, a: 2 }
		expect(Object.keys(input)).to.eql([ 'b', 'a' ])
		const output = { a: 2, b: 1 }
		expect(Object.keys(output)).to.eql([ 'a', 'b' ])
		const result = sortObjectCircular(input)
		expect(Object.keys(result)).to.eql([ 'a', 'b' ])
		expect(result).to.eql(output)
	})

	it('should sort objects in objects', () => {
		const input = { b: 1, a: { ab: 21, aa: 22 } }
		expect(Object.keys(input)).to.eql([ 'b', 'a' ])
		expect(Object.keys(input.a)).to.eql([ 'ab', 'aa' ])
		const output = { a: { aa: 22, ab: 21 }, b: 1 }
		expect(Object.keys(output)).to.eql([ 'a', 'b' ])
		expect(Object.keys(output.a)).to.eql([ 'aa', 'ab' ])
		const result = sortObjectCircular(input)
		expect(Object.keys(result)).to.eql([ 'a', 'b' ])
		expect(Object.keys(result.a)).to.eql([ 'aa', 'ab' ])
		expect(result).to.eql(output)
	})

	it('should leave array order intact', () => {
		expect(sortObjectCircular([ 2, 1 ])).to.eql([ 2, 1 ])
	})

	it('should sort objects in arrays', () => {
		const input = [ 1, { b: 2, a: 3 } ]
		expect(Object.keys(input)).to.eql([ '0', '1' ])
		expect(Object.keys(input[1])).to.eql([ 'b', 'a' ])
		const output = [ 1, { a: 3, b: 2 } ]
		expect(Object.keys(output)).to.eql([ '0', '1' ])
		expect(Object.keys(output[1])).to.eql([ 'a', 'b' ])
		const result = sortObjectCircular(input)
		expect(Object.keys(result)).to.eql([ '0', '1' ])
		expect(Object.keys(result[1])).to.eql([ 'a', 'b' ])
		expect(result).to.eql(output)
	})

	it('should sort circular structures', () => {
		function createCircular() {
			const a = {}
			const b = { b: true, a }
			a.b = b
			a.a = true
			return a
		}
		function createSortedCircular() {
			const a = { a: true }
			const b = { a, b: true }
			a.b = b
			return a
		}
		const input = createCircular()
		expect(Object.keys(input)).to.eql([ 'b', 'a' ])
		expect(Object.keys(input.b)).to.eql([ 'b', 'a' ])
		expect(input.b.a.a).to.be.true()
		expect(input.b.a.b.b).to.be.true()
		const output = createSortedCircular()
		expect(Object.keys(output)).to.eql([ 'a', 'b' ])
		expect(Object.keys(output.b)).to.eql([ 'a', 'b' ])
		expect(output.b.a.a).to.be.true()
		expect(output.b.a.b.b).to.be.true()
		const result = sortObjectCircular(input)
		expect(Object.keys(result)).to.eql([ 'a', 'b' ])
		expect(Object.keys(result.b)).to.eql([ 'a', 'b' ])
		expect(result.b.a.a).to.be.true()
		expect(result.b.a.b.b).to.be.true()
		expect(result).to.eql(output)
	})

	it('should clone objects with prototypes', () => {
		function Person(name, age) {
			this.name = name
			this.age = age
		}
		const input = new Person('Mick', 23)
		expect(Object.keys(input)).to.eql([ 'name', 'age' ])
		expect(input).to.be.an.instanceOf(Person)
		const output = Object.create(Person.prototype)
		output.age = 23
		output.name = 'Mick'
		expect(Object.keys(output)).to.eql([ 'age', 'name' ])
		expect(output).to.be.an.instanceOf(Person)
		const result = sortObjectCircular(input)
		expect(Object.keys(result)).to.eql([ 'age', 'name' ])
		expect(result).to.be.an.instanceOf(Person)
		expect(result).to.eql(output)
	})
})
