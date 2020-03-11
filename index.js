let Char = {};
let gameState = {};
const Characters = [
  {
    name: "yoda",
    attackPower: 4,
    counterAttackPower: 22,
    healthPoints: 150
  },
  {
    name: "R2D2",
    attackPower: 5,
    counterAttackPower: 18,
    healthPoints: 120
  },
  {
    name: "Luke Skywalker",
    attackPower: 8,
    counterAttackPower: 15,
    healthPoints: 100,
    playing: false
  },
  {
    name: "Princess Leia",
    attackPower: 6,
    counterAttackPower: 12,
    healthPoints: 120
  }
];

const setCharacter = characterInput => {
  let selectedCharacter = Characters.filter(
    character => character.name === characterInput
  );
  console.log(selectedCharacter);
  Char = selectedCharacter[0];
  setState(Char);
};

const setState = Char => {
  gameState.player = Char.name;
  (gameState.attackPower = Char.attackPower),
    (gameState.healthPoints = Char.healthPoints),
    (gameState.counterAttackPower = Char.counterAttackPower),
    console.log(gameState);
  setStorage(gameState);
};

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
