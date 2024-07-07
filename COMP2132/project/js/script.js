// Mark Peng COMP2132 Final Project
document.addEventListener('DOMContentLoaded', () => {
    const playerDice = [document.getElementById('player-die1'), document.getElementById('player-die2')];
    const computerDice = [document.getElementById('computer-die1'), document.getElementById('computer-die2')];

    const playerRoundScoreElem = document.getElementById('player-round-score');
    const playerTotalScoreElem = document.getElementById('player-total-score');
    const computerRoundScoreElem = document.getElementById('computer-round-score');
    const computerTotalScoreElem = document.getElementById('computer-total-score');
    const resultMessageElem = document.getElementById('result-message');
    const roundNumberElem = document.getElementById('round-number');

    const rollBtn = document.getElementById('roll-btn');
    const resetBtn = document.getElementById('reset-btn');

    let playerTotalScore = 0;
    let computerTotalScore = 0;
    let rounds = 0;

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function updateDiceImages(dice, values) {
        dice.forEach((die, index) => {
            die.src = `images/dice${values[index]}.png`;
        });
    }

    function calculateScore(die1, die2) {
        if (die1 === 1 || die2 === 1) {
            return 0;
        }
        if (die1 === die2) {
            return (die1 + die2) * 2;
        }
        return die1 + die2;
    }

    function playRound() {
        if (rounds >= 3) return;

        const playerRolls = [rollDice(), rollDice()];
        const computerRolls = [rollDice(), rollDice()];

        updateDiceImages(playerDice, playerRolls);
        updateDiceImages(computerDice, computerRolls);

        const playerRoundScore = calculateScore(...playerRolls);
        const computerRoundScore = calculateScore(...computerRolls);

        playerTotalScore += playerRoundScore;
        computerTotalScore += computerRoundScore;

        playerRoundScoreElem.textContent = playerRoundScore;
        computerRoundScoreElem.textContent = computerRoundScore;
        playerTotalScoreElem.textContent = playerTotalScore;
        computerTotalScoreElem.textContent = computerTotalScore;

        rounds++;
        roundNumberElem.textContent = rounds;

        if (rounds === 3) {
            displayWinner();
        }
    }

    function displayWinner() {
        if (playerTotalScore > computerTotalScore) {
            resultMessageElem.textContent = 'Player Wins!';
        } else if (computerTotalScore > playerTotalScore) {
            resultMessageElem.textContent = 'Computer Wins!';
        } else {
            resultMessageElem.textContent = 'It\'s a Tie!';
        }
    }

    function resetGame() {
        playerTotalScore = 0;
        computerTotalScore = 0;
        rounds = 0;
        playerRoundScoreElem.textContent = '0';
        computerRoundScoreElem.textContent = '0';
        playerTotalScoreElem.textContent = '0';
        computerTotalScoreElem.textContent = '0';
        resultMessageElem.textContent = '';
        roundNumberElem.textContent = '1';
        updateDiceImages(playerDice, [1, 1]);
        updateDiceImages(computerDice, [1, 1]);
    }

    rollBtn.addEventListener('click', playRound);
    resetBtn.addEventListener('click', resetGame);
});
