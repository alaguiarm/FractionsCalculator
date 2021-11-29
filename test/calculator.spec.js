var Parser = require('../src/parser');
var Calculator = require('../src/calculator');
var Fraction = require('../src/fraction');
var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Fractions Calculator Test', function () {
    describe('Calculator Operations Test', function () {
        describe('Addition Test', function () {
            it('Should add homogeneus fractions', function () {
                let firstOperand = new Fraction(19, 8, false);
                let secondOperand = new Fraction(9, 8, false);
                let calculatorInstance = new Calculator(firstOperand, "+", secondOperand);
                calculatorInstance.calculate().should.be.equal("3_1/2");
            });
            it('Should add heterogeneous fractions', function () {
                let firstOperand = new Fraction(1, 8, false);
                let secondOperand = new Fraction(2, 5, false);
                let calculatorInstance = new Calculator(firstOperand, "+", secondOperand);
                calculatorInstance.calculate().should.be.equal("21/40");
            });
        });
        describe('Substraction Test', function () {
            it('Should substract homogeneus fractions', function () {
                let firstOperand = new Fraction(19, 8, false);
                let secondOperand = new Fraction(9, 8, false);
                let calculatorInstance = new Calculator(firstOperand, "-", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_1/4");
            });
            it('Should substract heterogeneous fractions', function () {
                let firstOperand = new Fraction(10, 453, false);
                let secondOperand = new Fraction(97, 19, false);
                let calculatorInstance = new Calculator(firstOperand, "-", secondOperand);
                calculatorInstance.calculate().should.be.equal("-5_716/8607");
            });
        });
        describe('Multiplication Test', function () {
            it('Should multiply positive fractions', function () {
                let firstOperand = new Fraction(1, 2, false);
                let secondOperand = new Fraction(15, 4, false);
                let calculatorInstance = new Calculator(firstOperand, "*", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_7/8");
            });
            it('Should multiply positive and negative fractions', function () {
                let firstOperand = new Fraction(1, 2, true);
                let secondOperand = new Fraction(15, 4, false);
                let calculatorInstance = new Calculator(firstOperand, "*", secondOperand);
                calculatorInstance.calculate().should.be.equal("-1_7/8");
            });
            it('Should multiply negative fractions', function () {
                let firstOperand = new Fraction(1, 2, true);
                let secondOperand = new Fraction(15, 4, true);
                let calculatorInstance = new Calculator(firstOperand, "*", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_7/8");
            });
        });
        describe('Division Test', function () {
            it('Should divide positive fractions', function () {
                let firstOperand = new Fraction(3, 5, false);
                let secondOperand = new Fraction(1, 2, false);
                let calculatorInstance = new Calculator(firstOperand, "/", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_1/5");
            });
            it('Should divide positive and negative fractions', function () {
                let firstOperand = new Fraction(3, 5, false);
                let secondOperand = new Fraction(1, 2, true);
                let calculatorInstance = new Calculator(firstOperand, "/", secondOperand);
                calculatorInstance.calculate().should.be.equal("-1_1/5");
            });
            it('Should divide negative fractions', function () {
                let firstOperand = new Fraction(3, 5, true);
                let secondOperand = new Fraction(1, 2, true);
                let calculatorInstance = new Calculator(firstOperand, "/", secondOperand);
                calculatorInstance.calculate().should.be.equal("1_1/5");
            });
        });
    });

});