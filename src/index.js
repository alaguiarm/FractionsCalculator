const {answer} = require("./controller");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("? ", function (inputStr) {
    try{
        console.log(answer(inputStr));   
    } catch (e) {
        console.error(e.message);
    } 
    rl.close();
});

rl.on("close", function () {
    process.exit(0);
});