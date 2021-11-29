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

module.exports = MixedNumber;