class WholeNumber {
    constructor(number,isNegative) {
        this.number = number;
        this.isNegative = isNegative;
    }

    get print(){
        return (this.isNegative ? "-" : "") + this.number;
    }
}

module.exports = WholeNumber;