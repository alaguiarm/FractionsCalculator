const Fraction = require('./fraction');
const MixedNumber = require('./mixednumber');
const WholeNumber = require('./wholenumber');

class Calculator{
    constructor(firstOperand,operator,secondOperand){
        this.firstOperand = firstOperand;
        this.secondOperand = secondOperand;
        this.operator = operator;
        this.result;
    }
    
    calculate(){
        if (this.operator === '+') {
            this.result = this.add(this.firstOperand,this.secondOperand).simplify();
        }else if (this.operator === '-') {  
            this.result = this.substract(this.firstOperand,this.secondOperand).simplify();
        }else if (this.operator === '*') {
            this.result = this.multiply(this.firstOperand,this.secondOperand).simplify();
        } else if (this.operator === '/') {
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
            return new Fraction(Math.abs(numeratorsAddition),this.firstOperand.denominator,numeratorsAddition < 0);
        } else {
            let commonDenominator, firstNewNumerator, secondNewNumerator;
            [firstNewNumerator, secondNewNumerator,commonDenominator] = this.getHeterogenousOperationTerms(firstOperand.numerator,firstOperand.denominator,secondOperand.numerator,secondOperand.denominator);
            let numeratorsAddition = this.getNumeratorsAddition(firstNewNumerator, firstOperand.isNegative, secondNewNumerator, secondOperand.isNegative);
            return new Fraction(Math.abs(numeratorsAddition),commonDenominator,numeratorsAddition < 0);
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
            return new Fraction(Math.abs(numeratorsSubstracion),this.firstOperand.denominator,numeratorsSubstracion < 0);
        } else {
            let commonDenominator, firstNewNumerator, secondNewNumerator;
            [firstNewNumerator, secondNewNumerator,commonDenominator] = this.getHeterogenousOperationTerms(this.firstOperand.numerator,this.firstOperand.denominator,this.secondOperand.numerator,this.secondOperand.denominator);
            let numeratorsSubstracion = this.getNumeratorsSubstraction(firstNewNumerator, this.firstOperand.isNegative, secondNewNumerator, this.secondOperand.isNegative);
            return new Fraction(Math.abs(numeratorsSubstracion),commonDenominator,numeratorsSubstracion < 0);
        }
    }

    getNumeratorsSubstraction(firstNumerator, firstSignal, secondNumerator, secondSignal){
        return firstNumerator*this.getSignMultiplier(firstSignal) - secondNumerator*this.getSignMultiplier(secondSignal);
    }

    greatestCommonDivisor(firstNumber,secondNumber){
        if (firstNumber === secondNumber){
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
        return (firstOperand.isNegative && secondOperand.isNegative) || (!firstOperand.isNegative && !secondOperand.isNegative);
    }

    convertFractionToMixed(numerator,denominator,sign){
        let remainder = numerator % denominator;
        return new MixedNumber(Math.floor(Math.abs(numerator) / Math.abs(denominator)),remainder,Math.abs(denominator),sign);
    }
}

module.exports = Calculator;