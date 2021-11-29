const {answer} = require("./calculator");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveReadLine = function () {
    rl.question("? ", function (inputStr) {
        if(inputStr === 'q' || inputStr === 'quit' || inputStr === 'exit' || inputStr === 'bye'){
            return rl.close();
        }
        try{
            console.log(answer(inputStr));   
        } catch (e) {
            console.error(e.message);
        } 
        recursiveReadLine();
    });
};

recursiveReadLine();
