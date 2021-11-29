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


module.exports = Fraction;