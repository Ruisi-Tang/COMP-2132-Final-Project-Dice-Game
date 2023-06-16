
let playerDiceResults;
let botDiceResults;
let diceOne; 
let diceTwo;

//roll dice function
function rollDice(diceOne, diceTwo) {
    let diceTotal;
    let diceOneValue = diceOne.value;
    let diceTwoValue = diceTwo.value;

    diceTotal = diceOne.value + diceTwo.value;

    const rollDiceResultJson = '{"diceOne":' + diceOneValue + ', "diceTwo": ' + diceTwoValue + ', "diceTotal": ' + diceTotal + '}'; 

    return JSON.parse(rollDiceResultJson);
}

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
    })

