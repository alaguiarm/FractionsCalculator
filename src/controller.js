class Fraction {
    constructor(numerator,denominator,isNegative) {
        this.numerator = +numerator;
        this.denominator = +denominator;
        this.isNegative = isNegative;
    }

    get print(){
        return (this.isNegative ? "-" : "") + this.numerator + "/" + this.denominator;
    }
}

class MixedNumber {
    constructor(whole,numerator,denominator,isNegative) {
        this.whole = whole;
        this.numerator = numerator;
        this.denominator = denominator;
        this.isNegative = isNegative;
    }

    get print(){
        return (this.isNegative ? "-" : "") + this.whole + "_" + this.numerator + "/" + this.denominator;
    }
}

class WholeNumber {
    constructor(number,isNegative) {
        this.number = number;
        this.isNegative = isNegative;
    }

    get print(){
        return (this.isNegative ? "-" : "") + this.number;
    }
}

function processExpression(termExpression){
    let minusFound = false;

    if(termExpression.startsWith('-')){
        termExpression = termExpression.substring(1);
        minusFound = true;
    }

    if (termExpression.includes("_") && termExpression.includes("/")){
        return convertMixedNumberToFraction(termExpression.split("_")[0],termExpression.split("_")[1],minusFound);
    } else if (termExpression.includes("/")){
        return [termExpression.split("/")[0],termExpression.split("/")[1],minusFound];
    }  else if (!isNaN(termExpression)){
        return [termExpression,1,minusFound];
    } else {
        //error
    }
};

function convertMixedNumberToFraction(whole,fraction,minusFound) {
    let [numerator, denominator] = fraction.split("/");
    //console.log((+whole * +denominator) + (+numerator),+denominator,minusFound);
    return [(+whole * +denominator) + (+numerator),denominator,minusFound];
}

function calculateOperation(firstOperand,operator,secondOperand){
    let fractionResult;

    if (operator === '+') {
        fractionResult = add(firstOperand,secondOperand);
    }else if (operator === '-') {  
         fractionResult = substract(firstOperand,secondOperand);
    }else if (operator === '*') {
         fractionResult = multiply(firstOperand,secondOperand);
    } else if (operator === '/') {
         fractionResult = divide(firstOperand,secondOperand);
    }

    if(fractionResult.numerator > 1 & fractionResult.denominator > 1){
        fractionResult = simplify(fractionResult.numerator,fractionResult.denominator,fractionResult.isNegative);
    }

    console.log(fractionResult.print);
    //return processFractionResult(fractionResult);
};

function simplify(numerator,denominator,sign){
    let firstNumber = Math.max(numerator,denominator);
    let secondNumber = Math.min(numerator,denominator);
    let remainder = 1;
    while(remainder > 0){
        //console.log("start",firstNumber,secondNumber,remainder);
        firstNumber = Math.max(firstNumber,secondNumber);
        secondNumber = Math.min(firstNumber,secondNumber);
        remainder = firstNumber % secondNumber;
        firstNumber = secondNumber;
        secondNumber = remainder;
        //console.log("end",firstNumber,secondNumber,remainder);
    }
    return new Fraction(Math.floor(numerator/firstNumber),Math.floor(denominator/firstNumber),sign);
}

function add(firstOperand,secondOperand){
    if(firstOperand.numerator === 0){       
        return secondOperand;
    } else if (secondOperand.numerator === 0){
        return firstOperand;
    } else if (firstOperand.denominator === secondOperand.denominator){
        let numeratorsAddition = getNumeratorsAddition(firstOperand.numerator, firstOperand.isNegative, secondOperand.numerator, secondOperand.isNegative);
        return new Fraction(Math.abs(numeratorsAddition),firstOperand.denominator,numeratorsAddition < 0 ? true : false);
    } else {
        let commonDenominator, firstNewNumerator, secondNewNumerator;
        [firstNewNumerator, secondNewNumerator,commonDenominator] = getHeterogenousOperationTerms(firstOperand.numerator,firstOperand.denominator,secondOperand.numerator,secondOperand.denominator);
        let numeratorsAddition = getNumeratorsAddition(firstNewNumerator, firstOperand.isNegative, secondNewNumerator, secondOperand.isNegative);
        return new Fraction(Math.abs(numeratorsAddition),commonDenominator,numeratorsAddition < 0 ? true : false);
    }
};

function substract(firstOperand,secondOperand){
    if(firstOperand.numerator === 0){
        return secondOperand.print;
    } else if (secondOperand.numerator === 0){
        return firstOperand.print;
    } else if (firstOperand.denominator === secondOperand.denominator){
        let numeratorsSubstracion = getNumeratorsSubstraction(firstOperand.numerator, firstOperand.isNegative, secondOperand.numerator, secondOperand.isNegative);
        return new Fraction(Math.abs(numeratorsSubstracion),firstOperand.denominator,numeratorsSubstracion < 0 ? true : false);
    } else {
        let commonDenominator, firstNewNumerator, secondNewNumerator;
        [firstNewNumerator, secondNewNumerator,commonDenominator] = getHeterogenousOperationTerms(firstOperand.numerator,firstOperand.denominator,secondOperand.numerator,secondOperand.denominator);
        let numeratorsSubstracion = getNumeratorsSubstraction(firstNewNumerator, firstOperand.isNegative, secondNewNumerator, secondOperand.isNegative);
        return new Fraction(Math.abs(numeratorsSubstracion),commonDenominator,numeratorsSubstracion < 0 ? true : false);
    }
};

function greatestCommonDivisor(firstNumber,secondNumber){
    if (firstNumber === firstNumber){
        return firstNumber;
    }else if(firstNumber > secondNumber){
        return greatestCommonDivisor(firstNumber-secondNumber,secondNumber);
    }else{
        return greatestCommonDivisor(firstNumber,secondNumber-firstNumber);
    }
};

function getCommonDenominator(gcd,firstNumber,secondNumber){
    if(gcd === 1){
        return firstNumber * secondNumber;
    }else{
        return Math.max(firstNumber,secondNumber);
    }
};

function getHeterogenousOperationTerms(firstNumerator,firstDenominator,secondNumerator,secondDenominator){
    let gcd, commonDenominator;
    gcd = greatestCommonDivisor(firstDenominator,secondDenominator);
    commonDenominator = getCommonDenominator(gcd,firstDenominator,secondDenominator);
    return [getNewNumerator(commonDenominator,firstDenominator,firstNumerator),getNewNumerator(commonDenominator,secondDenominator,secondNumerator),commonDenominator];
};

function getNewNumerator(commonDenominator,denominator,numerator){
    return (commonDenominator / denominator) * numerator;
};

function getSignMultiplier(negSignalFlag){
    return negSignalFlag ? -1 : 1;
};

function getNumeratorsAddition(firstNumerator, firstSignal, secondNumerator, secondSignal){
    return firstNumerator*getSignMultiplier(firstSignal) + secondNumerator*getSignMultiplier(secondSignal);
};

function getNumeratorsSubstraction(firstNumerator, firstSignal, secondNumerator, secondSignal){
    return firstNumerator*getSignMultiplier(firstSignal) - secondNumerator*getSignMultiplier(secondSignal);
};

function multiply(firstOperand,secondOperand){
    if(firstOperand.numerator === 0 || secondOperand.numerator === 0 || firstOperand.denominator === 0 || secondOperand.denominator === 0){
        return new Fraction(0,1,false);
    }else{
        return new Fraction(firstOperand.numerator*secondOperand.numerator,firstOperand.denominator*secondOperand.denominator,getSignCombination(firstOperand,secondOperand));
    }
};

function getSignCombination(firstOperand,secondOperand){
    return ((firstOperand.isNegative && secondOperand.isNegative) || (!firstOperand.isNegative && !secondOperand.isNegative)) ? false : true;
} 

function divide(firstOperand,secondOperand){
    if(firstOperand.numerator === 0 || secondOperand.numerator === 0 || firstOperand.denominator === 0 || secondOperand.denominator === 0){
        return new Fraction(0,1,false);
    }else{
        return new Fraction(firstOperand.numerator*secondOperand.denominator,firstOperand.denominator*secondOperand.numerator,getSignCombination(firstOperand,secondOperand));
    }
};

const answer = (expressionStr) => {
    let expressionArray = expressionStr.split(/\s+/);
    if(expressionArray.length === 3 && expressionArray[2].length > 0){
        const [term1, operator, term2] = expressionArray;
        let firstNumerator, firstDenominator, firstMinusFound, secondNumerator, secondDenominator, secondMinusFound;
        [firstNumerator, firstDenominator, firstMinusFound]= processExpression(term1);
        [secondNumerator, secondDenominator, secondMinusFound] = processExpression(term2);
        const firstOperand = new Fraction(firstNumerator, firstDenominator, firstMinusFound);
        const secondOperand = new Fraction(secondNumerator, secondDenominator, secondMinusFound);
        return calculateOperation(firstOperand,operator,secondOperand);
    }else{
        throw new Error ('Invalid expression. Try again with another one.');
    }
}

module.exports = {
    answer, processExpression,convertMixedNumberToFraction, calculateOperation
};