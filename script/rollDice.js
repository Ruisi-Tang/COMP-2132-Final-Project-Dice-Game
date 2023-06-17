let playerDiceResults;
let botDiceResults;
let diceOne; 
let diceTwo;

const rollBtn = $('#roll-btn'); 
const playerDiceOneImg = $('#player-dice-1');
const playerDiceTwoImg = $('#player-dice-2');
const botDiceOneImg = $('#robot-dice-1'); 
const botDiceTwoImg = $('#robot-dice-2'); 
const playerNum = $('#player-number'); 
const robotNum  = $('#robot-number'); 

//roll dice function
function rollDice(diceOne, diceTwo) {
    let diceTotal;
    let diceOneValue = diceOne.value;
    let diceTwoValue = diceTwo.value;

    diceTotal = diceOne.value + diceTwo.value;

    const rollDiceResultJson = '{"diceOne":' + diceOneValue + ', "diceTwo": ' + diceTwoValue + ', "diceTotal": ' + diceTotal + '}'; 

    return JSON.parse(rollDiceResultJson);
}

rollBtn.on('click', function () {
    //roll dice for human player, fetch dice results from dejete.com roll dice api
    fetch('https://www.dejete.com/api?nbde=2&tpde=6', {
        cache: 'no-store', 
    })
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            console.log(data[1]);

            diceOne = data[0];
            diceTwo = data[1];

            playerDiceResults = rollDice(diceOne, diceTwo);
            console.log(playerDiceResults);

            playerNum.text(playerDiceResults.diceTotal); 
            playerDiceOneImg.attr('src', 'dice-imgs/dice-' + playerDiceResults.diceOne + '.png'); 
            playerDiceTwoImg.attr('src', 'dice-imgs/dice-' + playerDiceResults.diceTwo + '.png'); 
        })


    //roll dice for bot player, fetch dice results from dejete.com roll dice api
    fetch('https://www.dejete.com/api?nbde=2&tpde=6', {
        cache: 'no-store', 
    })
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            console.log(data[1]);

            diceOne = data[0];
            diceTwo = data[1];

            botDiceResults = rollDice(diceOne, diceTwo);
            console.log(botDiceResults);

            robotNum.text(botDiceResults.diceTotal); 
            botDiceOneImg.attr('src', 'dice-imgs/dice-' + botDiceResults.diceOne + '.png');
            botDiceTwoImg.attr('src', 'dice-imgs/dice-' + botDiceResults.diceTwo + '.png');
        })
}); 


