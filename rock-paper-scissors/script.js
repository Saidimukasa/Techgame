// script.js

// DOM Elements
const modeSelection = document.getElementById("mode-selection");
const gameArea = document.getElementById("game-area");
const choices = document.querySelectorAll(".choice");
const messageElem = document.getElementById("message");
const player1ChoiceElem = document.getElementById("player1-choice");
const player2ChoiceElem = document.getElementById("player2-choice");
const player1ScoreElem = document.getElementById("player1-score");
const player2ScoreElem = document.getElementById("player2-score");

// Game State Variables
let mode = ""; // "PvC" or "PvP"
let player1Score = 0;
let player2Score = 0;
let player1Choice = "";
let isPlayer1Turn = true; // Used for PvP mode

// Event Listeners for Mode Selection
document.getElementById("play-pc").addEventListener("click", () => startGame("PvC"));
document.getElementById("play-friend").addEventListener("click", () => startGame("PvP"));

// Start Game
function startGame(selectedMode) {
  mode = selectedMode;
  modeSelection.classList.add("hidden");
  gameArea.classList.remove("hidden");
  resetGame();
}

// Reset Game
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  player1ScoreElem.textContent = player1Score;
  player2ScoreElem.textContent = player2Score;
  messageElem.textContent = mode === "PvC" ? "Make your move!" : "Player 1's turn!";
}

// Event Listeners for Choices
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (mode === "PvC") handlePvC(choice.id);
    if (mode === "PvP") handlePvP(choice.id);
  });
});

// Player vs Computer (PvC)
function handlePvC(playerChoice) {
  const computerChoice = getRandomChoice();
  const result = determineWinner(playerChoice, computerChoice);

  // Update Choices
  player1ChoiceElem.textContent = getEmoji(playerChoice);
  player2ChoiceElem.textContent = getEmoji(computerChoice);

  // Update Scores
  updateScores(result);
  displayResult(result, playerChoice, computerChoice);
}

// Player vs Player (PvP)
function handlePvP(playerChoice) {
  if (isPlayer1Turn) {
    player1Choice = playerChoice;
    messageElem.textContent = "Player 2's turn!";
    isPlayer1Turn = false;
  } else {
    const result = determineWinner(player1Choice, playerChoice);

    // Update Choices
    player1ChoiceElem.textContent = getEmoji(player1Choice);
    player2ChoiceElem.textContent = getEmoji(playerChoice);

    // Update Scores
    updateScores(result);
    displayResult(result, player1Choice, playerChoice);

    // Reset for Player 1's turn
    isPlayer1Turn = true;
    messageElem.textContent = "Player 1's turn!";
  }
}

// Get Random Computer Choice
function getRandomChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

// Determine Winner
function determineWinner(choice1, choice2) {
  if (choice1 === choice2) return "draw";
  if (
    (choice1 === "rock" && choice2 === "scissors") ||
    (choice1 === "paper" && choice2 === "rock") ||
    (choice1 === "scissors" && choice2 === "paper")
  ) {
    return isPlayer1Turn ? "player1" : "player2";
  }
  return isPlayer1Turn ? "player2" : "player1";
}

// Update Scores
function updateScores(result) {
  if (result === "player1") player1Score++;
  if (result === "player2") player2Score++;

  player1ScoreElem.textContent = player1Score;
  player2ScoreElem.textContent = player2Score;
}

// Display Result
function displayResult(result, choice1, choice2) {
  if (result === "draw") {
    messageElem.textContent = `It's a draw! Both chose ${getEmoji(choice1)}.`;
  } else if (result === "player1") {
    messageElem.textContent = `Player 1 wins! ${getEmoji(choice1)} beats ${getEmoji(choice2)}.`;
  } else {
    messageElem.textContent = `Player 2 wins! ${getEmoji(choice2)} beats ${getEmoji(choice1)}.`;
  }
}

// Get Emoji
function getEmoji(choice) {
  const emojis = { rock: "✊", paper: "✋", scissors: "✌️" };
  return emojis[choice];
}
