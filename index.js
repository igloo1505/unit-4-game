let Char = {};
let gameState = {};
const CharOne = {
  name: "Andrew",
  attackPower: 20,
  counterAttackPower: 34,
  healthPoints: 100
};
const Andrew = {
  name: "The Real Andrew",
  attackPower: 20,
  counterAttackPower: 34,
  healthPoints: 100
};
const setCharacter = character => {
  Char = character;
  setState(Char);
};

const setState = Char => {
  (gameState.attackPower = Char.attackPower),
    (gameState.healthPoints = Char.healthPoints),
    (gameState.counterAttackPower = Char.counterAttackPower),
    (gameState.player = Char.name);
  console.log(gameState);
  return gameState;
};

// setCharacter(CharOne);
// setState(Char);

const setStorage = () => {
  window.localStorage.setItem("player", gameState.player);
  window.localStorage.setItem("attackPower", gameState.attackPower);
  window.localStorage.setItem(
    "counterAttackPower",
    gameState.counterAttackPower
  );
  window.localStorage.setItem("healthPoints", gameState.healthPoints);
};
setStorage();

let x = window.localStorage.getItem("player");
console.log("x", x);
