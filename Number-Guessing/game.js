
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomNum = Math.floor(Math.random() * 100) + 1; 
let attempts;        
let usedattempts = 0

function answer(){ 
    rl.question("Enter your guess: ", (input)=>{
    input = parseInt(input)

        if(input > randomNum){
            console.log(`Incorrect! The number is less than ${input}`)
            usedattempts++
                if (usedattempts == attempts){
                     console.log(`Sorry! You've used all 10 attempts. The correct number was ${randomNum}.`)
                     rl.close()}
                else{answer()}
        }
        else if(input < randomNum){
            console.log(`Incorrect! The number is greater than ${input}`)
            usedattempts++
                if (usedattempts == attempts){
                     console.log(`Sorry! You've used all ${attempts} attempts. The correct number was ${randomNum}.`)
                     rl.close()}
                else{answer()}
        }
        if(input == randomNum){ 
             console.log(`Congratulations! You guessed the correct number in ${usedattempts} attempts. `)
             rl.close()
        
        }})}
const msg = ()=>{
    
    const msg1 = "welcome to Number Guessing Game \nI'm thinking of a number between 1 and 100.\nYou have 5 chances to guess the correct number.\n Please select the difficulty level."
    console.log(msg1)

}


const easy = ()=>{
    attempts = 10;
    usedattempts = 0;
   console.log("Great! You have selected the Easy difficulty level.\nLet's start the game!");

        answer()}

const medium = ()=>{
    usedattempts = 0
    attempts = 5
    console.log("Great! You have selected the Medium difficulty level.\nLet's start the game!")

    answer()}



const hard = ()=>{
    usedattempts = 0
     attempts = 3
    console.log("Great! You have selected the Hard difficulty level.\nLet's start the game!")
answer()}



const difficultyLevel = ()=>{
     console.log("1.Easy (10 changes)\n2.Medium (5 changes)\n3.Hard (3 changes)");

    rl.question("Please enter your choice: ", (input)=>{
    if(input == 1 ) {easy()}

    else if(input == 2 ) {medium()}

    else if(input == 3 ) {hard()}

    else{console.log("please enter a number betwwen 1 to 3 ");
         rl.close();
        }
})}


msg();
difficultyLevel()
