let playerDiceResults;
let botDiceResults;
let diceOne; 
let diceTwo;

//buttons elements
const startBtn = $('#game-start-btn');
const rollBtn = $('#roll-btn'); 
const resetBtn = $('#reset-btn');

//pages elements
const startPage = $('#start-page');
const gamePage  = $('#game-page');
const resultPage = $('#result-page');
const winnerPage = $('#winner-page');
const loserPage = $('#loser-page');
const drawPage = $('#draw-page');

//text elements
const playerName = $('#player-name');
const playerNum = $('#player-number'); 
const robotNum  = $('#robot-number'); 
const playerNumMsg = $('#player-number-msg');
const robotNumMsg = $('#bot-number-msg');
const playerScoreDisplay = $('#player-score');
const botScoreDisplay = $('#robot-score');

//image elements
const playerDiceOneImg = $('#player-dice-1');
const playerDiceTwoImg = $('#player-dice-2');
const botDiceOneImg = $('#robot-dice-1'); 
const botDiceTwoImg = $('#robot-dice-2'); 

let btnClickCount = 0;
let playerScore = 0;
let botScore = 0;

//player object
function Player (name, score) {
    this.name = name;
    this.score = score;
}

const MAX_DICE_ROLL = 3;
const WINNING_MSG_TIME_OUT_MSEC = 1000;

//create player object (human player input their name in the prompt)
startBtn.on('click', function () {
    console.log('start button was clicked');
    const playerNameInputVal = $('#player_name_input').val(); 
    console.log(playerNameInputVal);
    if (playerNameInputVal == null || playerNameInputVal.trim() === '') {
        $('#error-msg').prop('hidden', false);
        $('#player_name_input').css('border', '5px solid red');
    }else{
        const player = new Player(playerNameInputVal, 0);
        console.log('player name is:' + player.name);
        playerName.text(player.name); 
        startPage.fadeOut(1000);
        gamePage.css('display', 'flex').hide().fadeIn(1000);
        rollBtn.prop('disabled', false);
    }
});

//roll dice function
function rollDice(diceOne, diceTwo) {
    let diceTotal;
    let diceOneValue = diceOne.value;
    let diceTwoValue = diceTwo.value;

    if(diceOneValue == 1 || diceTwoValue == 1) {
        diceTotal = 0;
    } else if (diceOneValue == diceTwoValue) {
        diceTotal = (diceOneValue + diceTwoValue) * 2;
    } else {
        diceTotal = diceOne.value + diceTwo.value;
    }
    
    const rollDiceResultJson = '{"diceOne":' + diceOneValue + ', "diceTwo": ' + diceTwoValue + ', "diceTotal": ' + diceTotal + '}'; 

    return JSON.parse(rollDiceResultJson);
}

//show the winner
function winner() {
    resultPage.css('visibility', 'visible');
    if (playerScore > botScore) {
        winnerPage.prop('hidden', false);
    } else if (playerScore < botScore) {
        loserPage.prop('hidden', false);
    } else {
        drawPage.prop('hidden', false);
    }
}

//roll dice button click event
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
            playerScore += playerDiceResults.diceTotal;
            playerNumMsg.prop('hidden', false);
            playerScoreDisplay.text(playerScore);
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
            botScore += botDiceResults.diceTotal;
            robotNumMsg.prop('hidden', false);
            botScoreDisplay.text(botScore);
        })

    //disable roll button after 3 clicks, show winner
    btnClickCount++;

    console.log('roll button was clicked ' + btnClickCount + ' times');

    if (btnClickCount == MAX_DICE_ROLL) {
        rollBtn.prop('disabled', true);
        rollBtn.text('Game Over!');
        setTimeout(winner, WINNING_MSG_TIME_OUT_MSEC); 
    }
}); 

//reset button click event
resetBtn.on('click', function () {
    console.log('reset button was clicked');
    playerScore = 0;
    botScore = 0;
    btnClickCount = 0;
    playerNum.text('0');
    robotNum.text('0');
    playerScoreDisplay.text('0');
    botScoreDisplay.text('0');
    playerNumMsg.prop('hidden', true);
    robotNumMsg.prop('hidden', true);
    resultPage.css('visibility', 'hidden');
    winnerPage.prop('hidden', true);
    loserPage.prop('hidden', true);
    drawPage.prop('hidden', true);
    rollBtn.prop('disabled', false);
    playerDiceOneImg.attr('src', 'dice-imgs/dice-1.png');
    playerDiceTwoImg.attr('src', 'dice-imgs/dice-1.png');
    botDiceOneImg.attr('src', 'dice-imgs/dice-1.png');
    botDiceTwoImg.attr('src', 'dice-imgs/dice-1.png');
    rollBtn.prop('hidden', false);
    rollBtn.text('⚡⚡⚡ROLL!⚡⚡⚡');
});

