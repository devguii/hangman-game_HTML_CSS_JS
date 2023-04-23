const words = ["apple", "banana", "lemon"];
let invalidLetters = [];
let palavra;
const maxAttempts = 5;
let errors = 0;
let keyboardListener;

const start = () => {
  randomWord = shuffleWord();

  for (let i = 0; i < randomWord.length; i++) {
    document
      .getElementById("word-area")
      .appendChild(createTextInput(randomWord[i]));
  }
};

const shuffleWord = () => {
  let index = Math.floor(Math.random() * words.length);
  return words[index];
};

const createTextInput = (letter) => {
  let input = document.createElement("input");
  input.type = "text";
  input.disabled = true;
  input.className = "input";
  input.maxLength = 1;

  return input;
};

const checkLetter = (letter) => {
  let found = false;

  for (let i = 0; i < String(randomWord).length; i++) {
    if (randomWord[i] == letter) {
      document.getElementsByTagName("input")[i].value = letter;
      found = true;
    }
  }

  return found;
};

const showInvalidLetters = () => {
  let invalid = "";

  for (let l of invalidLetters.sort()) {
    invalid += " " + l;
  }

  document.getElementById("invalid").innerHTML = "Letras inválidas: " + invalid;
};

const showMessageSuccess = () => {
  let pMessage = document.createElement("p");
  pMessage.innerHTML = "Parabéns! Encontrou a palavra.";
  document.getElementById("word").appendChild(pMessage);
};

const showFailMessage = () => {
  let pMessage = document.createElement("p");
  pMessage.innerHTML = "Falhou! A palavra era: " + randomWord;
  document.getElementById("word").appendChild(pMessage);
};

const checkSuccess = () => {
  for (let l of document.getElementsByClassName("input")) {
    if (l.value == "") return false;
  }

  return true;
};

const buttonPressed = (event) => {
  const letter = event.key;

  let found = checkLetter(letter);

  if (!found) {
    if (!invalidLetters.includes(letter)) {
      invalidLetters.push(letter);
      showInvalidLetters();
      errors++;
    }
  }

  if (errors == maxAttempts) {
    showFailMessage();
    document.removeEventListener("keydown", buttonPressed, true);
  }

  if (checkSuccess()) {
    showMessageSuccess();
    document.removeEventListener("keydown", buttonPressed, true);
  }

  document.getElementById("attempts").innerHTML =
    "Chances: " + (maxAttempts - errors);
};

window.onload = () => {
  keyboardListener = document.addEventListener("keydown", buttonPressed, true);
};
