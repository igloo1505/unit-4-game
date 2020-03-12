const YodaPoints = document.getElementById("YodaPoints");
const LukePoints = document.getElementById("LukePoints");
const R2D2Points = document.getElementById("R2D2Points");
const HansPoints = document.getElementById("HansPoints");
const DarthPoints = document.getElementById("DarthPoints");
const LeiaPoints = document.getElementById("LeiaPoints");
const playerCard = document.getElementById("playerSelected");
const opponentCard = document.getElementById("opponentCard");
const playerPoints = document.getElementById("playerPoints");
const playerTitle = document.getElementById("playerTitle");
const playerCounterAttack = document.getElementById("playerCounterAttack");
const playerAttack = document.getElementById("playerAttackPower");

let Char = {};
let gameState = {};
const Characters = [
  {
    name: "yoda",
    image: "./assets/Char1.png",
    attackPower: 4,
    counterAttackPower: 22,
    healthPoints: 150
  },
  {
    name: "Luke Skywalker",
    attackPower: 8,
    image: "./assets/Char2.png",
    counterAttackPower: 15,
    healthPoints: 100,
    playing: false
  },
  {
    name: "R2D2",
    image: "./assets/Char3.png",
    attackPower: 5,
    counterAttackPower: 18,
    healthPoints: 120
  },
  {
    name: "Hans Solo",
    image: "./assets/Char4.png",
    attackPower: 6,
    counterAttackPower: 12,
    healthPoints: 120
  },
  {
    name: "Darth Vader",
    image: "./assets/Char5.png",
    attackPower: 10,
    counterAttackPower: 10,
    healthPoints: 80
  },
  {
    name: "Princess Leia",
    image: "./assets/Char6.png",
    attackPower: 6,
    counterAttackPower: 12,
    healthPoints: 120
  }
];
let opponentArray = [];

const setOpponents = Char => {
  console.log("Char", Char);
  const allButMe = Characters.filter(character => character.name !== Char.name);
  console.log("allButMe", allButMe);

  for (var i = 0; i < 3; i++) {
    let randomNum = Math.floor(Math.random() * allButMe.length);
    console.log("randomNum", randomNum);
    let ToString = JSON.stringify(allButMe[randomNum]);
    window.localStorage.setItem(`opponent ${i}`, ToString);
    opponentArray.push(allButMe[randomNum]);
    allButMe.splice(allButMe[randomNum], 1);
  }
  console.log(opponentArray);
};

const setCharacter = characterInput => {
  const stateCheck = window.localStorage.getItem("player");
  console.log("stateCheck", stateCheck);
  if (stateCheck !== null && stateCheck !== characterInput) {
    console.log(
      "You've already selected a character. CALL RESET FUNCTION THROUGH MODAL HERE"
    );
    return;
  } else if (
    stateCheck == undefined ||
    stateCheck == characterInput ||
    stateCheck == null
  ) {
    let selectedCharacter = Characters.filter(
      character => character.name === characterInput
    );
    Char = selectedCharacter[0];
    setOpponents(Char);
    setState(Char);
  }
};

const setDisplay = () => {
  if (window.location.href.includes("choose")) {
    YodaPoints.innerHTML = Characters[0].healthPoints;
    LukePoints.innerHTML = Characters[1].healthPoints;
    R2D2Points.innerHTML = Characters[2].healthPoints;
    HansPoints.innerHTML = Characters[3].healthPoints;
    DarthPoints.innerHTML = Characters[4].healthPoints;
    LeiaPoints.innerHTML = Characters[5].healthPoints;
  } else if (window.location.href.includes("play")) {
    playerCard.setAttribute("src", window.localStorage.getItem("image"));
    playerTitle.innerHTML = window.localStorage.getItem("player");
    playerPoints.innerHTML = window.localStorage.getItem("healthPoints");
    playerAttack.innerHTML = window.localStorage.getItem("attackPower");
    playerCounterAttack.innerHTML = window.localStorage.getItem(
      "counterAttackPower"
    );

    // let opponent = opponentArray[0];
    // console.log(opponent);
    // document
    //   .getElementById("opponentCard0")
    //   .setAttribute("src", opponent.image);

    // !!! for loop to output opponent array to html
    // for (var i = 0; i < opponentArray.length; i++) {}
  }
};
setDisplay();

const setState = Char => {
  gameState.player = Char.name;
  (gameState.attackPower = Char.attackPower),
    (gameState.healthPoints = Char.healthPoints),
    (gameState.counterAttackPower = Char.counterAttackPower),
    (gameState.image = Char.image);
  console.log(gameState);
  console.log(window.location.href);
  if (window.location.href.includes("choose")) {
    window.location.href = "/play.html";
  }
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
  window.localStorage.setItem("image", gameState.image);
};
// setStorage();

let x = window.localStorage.getItem("player");
console.log("x", x);
