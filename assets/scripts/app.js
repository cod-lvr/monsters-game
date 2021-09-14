const attackValue = 10;
const mosterAttackValue = 14;
const strongAttackValue = 17;
const healValue = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBounsLife = true;

adjustHealthBars(chosenMaxLife);

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;  
  const playerDamge = dealPlayerDamage(mosterAttackValue);
  currentPlayerHealth -= playerDamge;

  if (currentPlayerHealth <= 0 && hasBounsLife) {
    hasBounsLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('saving by bouns life ;)');
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you win!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have adraw!");
  }
}

function attackMonster(mode) {
  let maxDamge;
  if (mode === "ATTACK") {
    maxDamge = attackValue;
  } else {
    maxDamge = strongAttackValue;
  }
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

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
