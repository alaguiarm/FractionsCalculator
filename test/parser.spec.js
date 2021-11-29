var parser = require('../src/parser');
var calculator = require('../src/calculator');
var fraction = require('../src/fraction');
var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('User Input Parser Test', function () {
    describe('Expression Input Test', function () {
        it('Should deal with complete expression', function () {
            parser.answer("1/2 + 3_3/4").should.be.equal("4_1/4");
        });
        it('Should deal with more than one or more spaces in expression', function () {
            parser.answer("1/2 +   3_3/4").should.be.equal("4_1/4");
        });
        it('Should deal with incomplete expression', function () {
            assert.throw(() => {parser.answer("1/2 + ")});
        });
        it('Should deal with empty expression', function () {
            assert.throw(() => {parser.answer("")});
        });
    });

    describe('Operation Terms Test', function () {
        it('Should deal with mixed numbers', function () {
            parser.processExpression("3_1/4").should.be.deep.equal([13,"4",false]);
        });
        it('Should deal with whole numbers', function () {
            parser.processExpression("7").should.be.deep.equal(["7",1,false]);
        });
        it('Should deal with proper fractions', function () {
            parser.processExpression("-1/5").should.be.deep.equal(["1","5",true]);
        });
        it('Should deal with zero denominator i.e. Zero division', function () {
            assert.throw(() => {parser.answer("1/2 + 3/0")});
        });
        it('Should deal with zero division', function () {
            assert.throw(() => {parser.answer("1/0 + 0")});
        });
    });
});