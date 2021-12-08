const Calculator = require('./calculator');
const Fraction = require('./fraction');
const MixedNumber = require('./mixednumber');
const WholeNumber = require('./wholenumber');

function processExpression(termExpression){
    let minusFound = false;

    if(termExpression.startsWith('-')){
        termExpression = termExpression.substring(1);
        minusFound = true;
    }

    if(isNaN(termExpression)){
        if (termExpression.includes("_") && termExpression.includes("/")){
            return validateMixedNumber(termExpression,minusFound);
        } else if (termExpression.includes("/")){
            return validateFraction(termExpression,minusFound);
        }
    }else{
        return [+termExpression,1,minusFound];
    }
    
};

function convertMixedNumberToFraction(whole,fraction,minusFound) {
    let [numerator, denominator] = fraction.split("/");
    return [(+whole * +denominator) + (+numerator),+denominator,minusFound];
};

function validateMixedNumber(expression,minusFound) {
    if(Number(expression.split("_")[0]) && Number(expression.split("/")[0].split("_")[1]) && Number(expression.split("/")[1]) && expression.split("/")[1] > 0){
        return convertMixedNumberToFraction(expression.split("_")[0],expression.split("_")[1],minusFound);
    }else{
        throw new Error ('Invalid expression. Try again with another one.');
    }  
};

function validateFraction(expression,minusFound) {
    if(expression.split("/")[1] > 0){
        return [Number(expression.split("/")[0]),Number(expression.split("/")[1]),minusFound];
    }else{
        throw new Error ('Invalid expression. Division by Zero. Try again with another one.');
    }
};

const answer = (expressionStr) => {
    let expressionArray = expressionStr.trim().split(/\s+/);
    if(expressionArray.length === 3 && expressionArray[2].length > 0){
        const [term1, operator, term2] = expressionArray;
        const firstOperand = new Fraction(...processExpression(term1));
        const secondOperand = new Fraction(...processExpression(term2));
        const calculatorInstance = new Calculator(firstOperand, operator, secondOperand);
        return calculatorInstance.calculate();
    }else{
        throw new Error ('Invalid expression. Try again with another one.');
    }
};

module.exports = {
    answer, processExpression, validateFraction, convertMixedNumberToFraction
};