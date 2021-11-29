class Fraction {
    constructor(numerator,denominator,isNegative) {
        this.numerator = +numerator;
        this.denominator = +denominator;
        this.isNegative = isNegative;
    }

    get print(){
        return (this.isNegative ? "-" : "") + this.numerator + "/" + this.denominator;
    }

    simplify(){
        let firstNumber = Math.max(this.numerator,this.denominator);
        let secondNumber = Math.min(this.numerator,this.denominator);
        let remainder = 1;
        while(remainder > 0){
            firstNumber = Math.max(firstNumber,secondNumber);
            secondNumber = Math.min(firstNumber,secondNumber);
            remainder = firstNumber % secondNumber;
            firstNumber = secondNumber;
            secondNumber = remainder;
        }
        return new Fraction(Math.floor(this.numerator/firstNumber),Math.floor(this.denominator/firstNumber),this.isNegative);
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

class Calculator{
    constructor(firstOperand,operator,secondOperand){
        this.firstOperand = firstOperand;
        this.secondOperand = secondOperand;
        this.operator = operator;
        this.result;
    }
    
    calculate(operator){
        if (operator === '+') {
            this.result = this.add(this.firstOperand,this.secondOperand).simplify();
        }else if (operator === '-') {  
            this.result = this.substract(this.firstOperand,this.secondOperand).simplify();
        }else if (operator === '*') {
            this.result = this.multiply(this.firstOperand,this.secondOperand).simplify();
        } else if (operator === '/') {
            this.result = this.divide(this.firstOperand,this.secondOperand).simplify();
        }

        if(this.result.numerator > this.result.denominator && this.result.numerator % this.result.denominator > 0){
            this.result = this.convertFractionToMixed(this.result.numerator,this.result.denominator,this.result.isNegative);
        }

        if(this.result.denominator === 1){
            this.result = new WholeNumber(this.result.numerator,this.result.isNegative);
        }

        return this.result.print;

    }

    add(firstOperand,secondOperand){
        if(this.firstOperand.numerator === 0){       
            return secondOperand;
        } else if (this.secondOperand.numerator === 0){
            return firstOperand;
        } else if (this.firstOperand.denominator === this.secondOperand.denominator){
            let numeratorsAddition = this.getNumeratorsAddition(this.firstOperand.numerator, this.firstOperand.isNegative, this.secondOperand.numerator, this.secondOperand.isNegative);
            return new Fraction(Math.abs(numeratorsAddition),this.firstOperand.denominator,numeratorsAddition < 0 ? true : false);
        } else {
            let commonDenominator, firstNewNumerator, secondNewNumerator;
            [firstNewNumerator, secondNewNumerator,commonDenominator] = this.getHeterogenousOperationTerms(firstOperand.numerator,firstOperand.denominator,secondOperand.numerator,secondOperand.denominator);
            let numeratorsAddition = this.getNumeratorsAddition(firstNewNumerator, firstOperand.isNegative, secondNewNumerator, secondOperand.isNegative);
            return new Fraction(Math.abs(numeratorsAddition),commonDenominator,numeratorsAddition < 0 ? true : false);
        }
    }

    getNumeratorsAddition(firstNumerator, firstSignal, secondNumerator, secondSignal){
        return firstNumerator*this.getSignMultiplier(firstSignal) + secondNumerator*this.getSignMultiplier(secondSignal);
    }

    substract(firstOperand,secondOperand){
        if(this.firstOperand.numerator === 0){
            return secondOperand;
        } else if (this.secondOperand.numerator === 0){
            return firstOperand;
        } else if (firstOperand.denominator === secondOperand.denominator){
            let numeratorsSubstracion = this.getNumeratorsSubstraction(this.firstOperand.numerator, this.firstOperand.isNegative, this.secondOperand.numerator, this.secondOperand.isNegative);
            return new Fraction(Math.abs(numeratorsSubstracion),this.firstOperand.denominator,numeratorsSubstracion < 0 ? true : false);
        } else {
            let commonDenominator, firstNewNumerator, secondNewNumerator;
            [firstNewNumerator, secondNewNumerator,commonDenominator] = this.getHeterogenousOperationTerms(this.firstOperand.numerator,this.firstOperand.denominator,this.secondOperand.numerator,this.secondOperand.denominator);
            let numeratorsSubstracion = this.getNumeratorsSubstraction(firstNewNumerator, this.firstOperand.isNegative, secondNewNumerator, this.secondOperand.isNegative);
            return new Fraction(Math.abs(numeratorsSubstracion),commonDenominator,numeratorsSubstracion < 0 ? true : false);
        }
    }

    getNumeratorsSubstraction(firstNumerator, firstSignal, secondNumerator, secondSignal){
        return firstNumerator*this.getSignMultiplier(firstSignal) - secondNumerator*this.getSignMultiplier(secondSignal);
    }

    greatestCommonDivisor(firstNumber,secondNumber){
        if (firstNumber === firstNumber){
            return firstNumber;
        }else if(firstNumber > secondNumber){
            return this.greatestCommonDivisor(firstNumber-secondNumber,secondNumber);
        }else{
            return this.greatestCommonDivisor(firstNumber,secondNumber-firstNumber);
        }
    };
    
    getCommonDenominator(gcd,firstNumber,secondNumber){
        if(gcd === 1){
            return firstNumber * secondNumber;
        }else{
            return Math.max(firstNumber,secondNumber);
        }
    };
    
    getHeterogenousOperationTerms(firstNumerator,firstDenominator,secondNumerator,secondDenominator){
        let gcd, commonDenominator;
        gcd = this.greatestCommonDivisor(firstDenominator,secondDenominator);
        commonDenominator = this.getCommonDenominator(gcd,firstDenominator,secondDenominator);
        return [this.getNewNumerator(commonDenominator,firstDenominator,firstNumerator),this.getNewNumerator(commonDenominator,secondDenominator,secondNumerator),commonDenominator];
    };
    
    getNewNumerator(commonDenominator,denominator,numerator){
        return (commonDenominator / denominator) * numerator;
    }

    multiply(firstOperand,secondOperand){
        if(this.firstOperand.numerator === 0 || this.secondOperand.numerator === 0 || this.firstOperand.denominator === 0 || this.secondOperand.denominator === 0){
            return new Fraction(0,1,false);
        }else{
            return new Fraction(this.firstOperand.numerator*this.secondOperand.numerator,this.firstOperand.denominator*this.secondOperand.denominator,this.getSignCombination(this.firstOperand,this.secondOperand));
        }
    }

    getSignMultiplier(negSignalFlag){
        return negSignalFlag ? -1 : 1;
    };
    
    divide(firstOperand,secondOperand){
        if(firstOperand.numerator === 0 || secondOperand.numerator === 0 || firstOperand.denominator === 0 || secondOperand.denominator === 0){
            return new Fraction(0,1,false);
        }else{
            return new Fraction(firstOperand.numerator*secondOperand.denominator,firstOperand.denominator*secondOperand.numerator,this.getSignCombination(this.firstOperand,this.secondOperand));
        }
    }

    getSignCombination(firstOperand,secondOperand){
        return ((firstOperand.isNegative && secondOperand.isNegative) || (!firstOperand.isNegative && !secondOperand.isNegative)) ? false : true;
    }

    convertFractionToMixed(numerator,denominator,sign){
        let remainder = numerator % denominator;
        return new MixedNumber(Math.floor(Math.abs(numerator) / Math.abs(denominator)),remainder,Math.abs(denominator),sign);
    }
}


function processExpression(termExpression){
    let minusFound = false;

    if(termExpression.startsWith('-')){
        termExpression = termExpression.substring(1);
        minusFound = true;
    }
    
    if (termExpression.includes("_") && termExpression.includes("/")){
        return validateMixedNumber(termExpression,minusFound);
    } else if (termExpression.includes("/")){
        return validateFraction(termExpression,minusFound);
    }  else if (Number(termExpression)){
        return [termExpression,1,minusFound];
    }
};

function convertMixedNumberToFraction(whole,fraction,minusFound) {
    let [numerator, denominator] = fraction.split("/");
    return [(+whole * +denominator) + (+numerator),denominator,minusFound];
};

function validateMixedNumber(expression,minusFound) {
    //console.log(expression.split("_")[0],expression.split("/")[0].split("_")[1],expression.split("/")[1]);
    if(Number(expression.split("_")[0]) && Number(expression.split("/")[0].split("_")[1]) && Number(expression.split("/")[1]) && expression.split("/")[1] > 0){
        return convertMixedNumberToFraction(expression.split("_")[0],expression.split("_")[1],minusFound);
    }else{
        throw new Error ('Invalid expression. Try again with another one.');
    }  
};

function validateFraction(expression,minusFound) {
    console.log(expression);
    if(expression.split("/")[1] > 0){
        return [expression.split("/")[0],expression.split("/")[1],minusFound];
    }else{
        throw new Error ('Invalid expression. Try again with another one.');
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
        let calculatorInstance = new Calculator(firstOperand, operator, secondOperand);
        return calculatorInstance.calculate(operator);
    }else{
        throw new Error ('Invalid expression. Try again with another one.');
    }
};

module.exports = {
    answer, processExpression,convertMixedNumberToFraction
};