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
const chooseAnother = document.getElementById("chooseAnother");
const fightButton = document.getElementById("fightButton");
const resetButton = document.getElementById("resetGame");

let winCount = 0;
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
    window.localStorage.setItem(`opponent${i}`, ToString);
    opponentArray.push(allButMe[randomNum]);
    allButMe.splice(randomNum, 1);
  }
  console.log(opponentArray);
};

const setCharacter = characterInput => {
  const stateCheck = window.localStorage.getItem("player");
  console.log("stateCheck", stateCheck);
  if (stateCheck !== null && stateCheck !== characterInput) {
    console.log(
      "You've already selected a character. CALL RESET FUNCTION THROUGH MODAL HERE to clear local storage"
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
  // debugger;
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
    for (var i = 0; i < 3; i++) {
      const parsed = JSON.parse(window.localStorage.getItem(`opponent${i}`));
      document
        .getElementById(`opponentCard${i}`)
        .setAttribute("src", parsed.image);
      document.getElementById(`opponentPoints${i}`).innerHTML =
        parsed.healthPoints;
      document.getElementById(`opponentTitle${i}`).innerHTML = parsed.name;
    }
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
    window.location.href = "./play.html";
  }
  setStorage(gameState);
};

const setStorage = () => {
  window.localStorage.setItem("player", gameState.player);
  window.localStorage.setItem("attackPower", gameState.attackPower);
  window.localStorage.setItem("originalAttackPower", gameState.attackPower);
  window.localStorage.setItem(
    "counterAttackPower",
    gameState.counterAttackPower
  );
  window.localStorage.setItem("healthPoints", gameState.healthPoints);
  window.localStorage.setItem("image", gameState.image);
};
// setStorage();
let temporaryOpponentStore = {};
let temporaryOpponentIndex = -1;
const setBattle = opponent => {
  console.log(opponent);
  let parsed = parseInt(opponent);
  temporaryOpponentIndex = parsed;
  let fromStorage = JSON.parse(
    window.localStorage.getItem(`opponent${parsed}`)
  );
  console.log(fromStorage);
  temporaryOpponentStore = fromStorage;

  let ops = [0, 1, 2];
  let em = document.getElementById(`cardOp${parsed}`);
  em.classList.add("cardBattle");

  opsFiltered = ops.filter(o => o !== parsed);
  console.log(opsFiltered);
  for (var i = 0; i < opsFiltered.length; i++) {
    document.getElementById(`cardOp${opsFiltered[i]}`).classList.add("hide");
  }
  fightButton.classList.remove("hide");
  chooseAnother.classList.remove("hide");
  resetButton.classList.add("hide");
};

document.getElementById("chooseAnother").addEventListener("click", () => {
  for (var i = 0; i < 3; i++) {
    let tempEm = document.getElementById(`cardOp${i}`);
    if (tempEm.classList.contains("hide")) {
      tempEm.classList.remove("hide");
    } else if (tempEm.classList.contains("cardBattle")) {
      tempEm.classList.remove("cardBattle");
    }
  }
  fightButton.classList.add("hide");
  chooseAnother.classList.add("hide");
  resetButton.classList.remove("hide");
  temporaryOpponentStore = {};
  temporaryOpponentIndex = -1;
});

fightButton.addEventListener("click", () => {
  console.log("ADD OPPONENT HEALTH QUERY AT LINE 200 AND HIDE OPPONENT IF 0");
  // hide opponent if health is less than zero, also add 'defeated' counter, and if equal to 3, alert of win
  let opponent = temporaryOpponentStore;
  console.log(opponent);
  let attackPower = parseInt(window.localStorage.getItem("attackPower"));
  let originalAttackPower = parseInt(
    window.localStorage.getItem("originalAttackPower")
  );
  opponent.healthPoints = opponent.healthPoints - attackPower;
  attackPower = attackPower + originalAttackPower;
  if (opponent.healthPoints <= 0) {
    document
      .getElementById(`cardOp${temporaryOpponentIndex}`)
      .classList.add("defeated");
    fightButton.classList.add("hide");
    winCount = winCount + 1;
    console.log(winCount);
    if (winCount >= 3) {
      alert("add bootstrap alert for win here(line 218)");
    }
  }
  let opponentAsString = JSON.stringify(opponent);
  window.localStorage.setItem(
    `opponent${temporaryOpponentIndex}`,
    opponentAsString
  );
  window.localStorage.setItem("attackPower", attackPower);
  setDisplay();
});

document.getElementById("resetGame").addEventListener("click", () => {
  window.localStorage.clear();
  window.location.href = "./index.html";
});

let x = window.localStorage.getItem("player");
console.log("x", x);
