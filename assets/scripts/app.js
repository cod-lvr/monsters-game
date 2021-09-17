const attackValue = 10;
const mosterAttackValue = 14;
const strongAttackValue = 17;
const healValue = 20;

// declare identifire
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MOSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("maximum life for you and moster is:", "100");

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(enteredValue) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBounsLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = "PLAYER";
  }

  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamge = dealPlayerDamage(mosterAttackValue);
  currentPlayerHealth -= playerDamge;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamge,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBounsLife) {
    hasBounsLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("saving by bouns life ;)");
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you win!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Player won!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Monster won!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have adraw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'its a draw!',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamge = mode === MODE_ATTACK ? attackValue : strongAttackValue;

  const damage = dealMonsterDamage(maxDamge);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster();
}

function healPlayerHandler() {
  let healing;
  if (currentPlayerHealth >= chosenMaxLife - healValue) {
    alert("you can not heal more than max health");
    healing = chosenMaxLife - currentPlayerHealth;
  } else {
    healing = healValue;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < battleLog.length; i++) {
    console.log(battleLog[i]);
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
