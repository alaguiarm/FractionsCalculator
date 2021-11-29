var parser = require('../src/parser');
var calculator = require('../src/calculator');
var fraction = require('../src/fraction');
var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Fractions Calculator Test', function () {
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

    describe('Expression Terms Test', function () {
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
    });


    describe('Calculator Operations Test', function () {
        describe('Addition Test', function () {
            it('Should add homogeneus fractions', function () {
                let firstOperand = new fraction(19, 8, false);
                let secondOperand = new fraction(9, 8, false);
                let calculatorInstance = new calculator(firstOperand, "+", secondOperand);
                calculatorInstance.calculate().should.be.equal("3_1/2");
            });
            it('Should add heterogeneous fractions', function () {
                let firstOperand = new fraction(1, 8, false);
                let secondOperand = new fraction(2, 5, false);
                let calculatorInstance = new calculator(firstOperand, "+", secondOperand);
                calculatorInstance.calculate().should.be.equal("21/40");
            });
        });
        describe('Substraction Test', function () {
            it('Should add homogeneus fractions', function () {
                let firstOperand = new fraction(19, 8, false);
                let secondOperand = new fraction(9, 8, false);
                let calculatorInstance = new calculator(firstOperand, "-", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_1/4");
            });
            it('Should substract heterogeneous fractions', function () {
                let firstOperand = new fraction(10, 453, false);
                let secondOperand = new fraction(97, 19, false);
                let calculatorInstance = new calculator(firstOperand, "-", secondOperand);
                calculatorInstance.calculate().should.be.equal("-5_716/8607");
            });
        });
        describe('Multiplication Test', function () {
            it('Should multiply', function () {
                let firstOperand = new fraction(1, 2, false);
                let secondOperand = new fraction(15, 4, false);
                let calculatorInstance = new calculator(firstOperand, "*", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_7/8");
            });
        });
        describe('Division Test', function () {
            it('Should divide', function () {
                let firstOperand = new fraction(3, 5, false);
                let secondOperand = new fraction(1, 2, false);
                let calculatorInstance = new calculator(firstOperand, "/", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_1/5");
            });
        });
    });

});