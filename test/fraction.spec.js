const Parser = require('../src/parser');
const Calculator = require('../src/calculator');
const Fraction = require('../src/fraction');
var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Fraction Class Test', function () {
    describe('Simplify function Test', function () {
        it('Should simplify fractions', function () {
            let fraction = new Fraction(24, 3, false);
            fraction.simplify().print.should.be.equal("8/1");
        });
        it('Should simplify divisible fractions', function () {
            let fraction = new Fraction(28, 8, false);
            fraction.simplify().print.should.be.deep.equal("7/2");
        });
        it('Should deal with fractions that cannot be simplified', function () {
            let fraction = new Fraction(2, 3, false);
            fraction.simplify().print.should.be.deep.equal("2/3");
        });
    });
});