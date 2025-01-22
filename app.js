// Liste de mots à afficher
const words = ["hello", "world", "javascript", "typing", "trainer", "speed", "accuracy"];

// Récupérer les éléments HTML
const wordsContainer = document.getElementById("words-container");
const typingInput = document.getElementById("typing-input");

// Fonction pour afficher les mots
function displayWords() {
  wordsContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter les mots
  words.forEach(word => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word + " "; // Ajoute un espace entre les mots
    wordsContainer.appendChild(wordSpan);
  });
}

// Écouter la saisie dans le champ
typingInput.addEventListener("input", () => {
  console.log("Saisie détectée :", typingInput.value);
});

// Initialisation
displayWords();

// Variables de progression
let currentWordIndex = 0; // Mot actuel
let currentInput = ""; // Ce que l'utilisateur a tapé jusqu'à présent

// Fonction pour comparer la saisie
function checkInput() {
  const currentWord = words[currentWordIndex]; // Mot attendu
  const input = typingInput.value; // Saisie utilisateur

  // Vérifie si la saisie correspond au début du mot attendu
  if (currentWord.startsWith(input)) {
    wordsContainer.children[currentWordIndex].style.color = "green"; // Correct
  } else {
    wordsContainer.children[currentWordIndex].style.color = "red"; // Incorrect
  }

  // Si le mot est terminé (entièrement correct)
  if (input === currentWord) {
    wordsContainer.children[currentWordIndex].style.color = "gray"; // Marquer le mot comme terminé
    currentWordIndex++; // Passe au mot suivant
    typingInput.value = ""; // Réinitialise la saisie
    currentInput = ""; // Réinitialise la saisie stockée
  }
}

// Écouter la saisie
typingInput.addEventListener("input", checkInput);

typingInput.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // Empêche l'ajout d'un espace dans l'input

    const currentWord = words[currentWordIndex]; // Mot attendu
    const input = typingInput.value.trim(); // Supprime les espaces accidentels

    if (input === currentWord) {
      wordsContainer.children[currentWordIndex].style.color = "gray"; // Mot correct
    } else {
      wordsContainer.children[currentWordIndex].style.color = "red"; // Mot incorrect
    }

    // Passe au mot suivant
    currentWordIndex++;
    typingInput.value = ""; // Réinitialise la saisie
    currentInput = ""; // Réinitialise la saisie stockée
  }
});

function checkInput() {
  const currentWord = words[currentWordIndex]; // Mot attendu
  const input = typingInput.value.trim(); // Supprime les espaces accidentels

  // Si l'utilisateur revient en arrière
  if (input === "" && currentWordIndex > 0) {
    currentWordIndex--; // Reviens au mot précédent
    typingInput.value = ""; // Vide l'input
    wordsContainer.children[currentWordIndex].style.color = "black"; // Réinitialise le style
    highlightActiveWord(); // Mets à jour le surlignage
    moveCursor(); // Mets à jour le curseur
    return;
  }

  // Vérifie si la saisie correspond au mot attendu
  if (currentWord.startsWith(input)) {
    wordsContainer.children[currentWordIndex].style.color = "green"; // Correct
  } else {
    wordsContainer.children[currentWordIndex].style.color = "red"; // Incorrect
  }
}

// Fonction pour mettre à jour le mot actif
function highlightActiveWord() {
  // Réinitialise tous les mots
  const wordSpans = wordsContainer.querySelectorAll("span");
  wordSpans.forEach(span => span.classList.remove("active-word"));

  // Ajoute la classe au mot actif
  if (wordSpans[currentWordIndex]) {
    wordSpans[currentWordIndex].classList.add("active-word");
  }
}

// Mets à jour le mot actif après chaque action
typingInput.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    highlightActiveWord();
  }
});

// Appelle cette fonction à l'initialisation
highlightActiveWord();

// Récupérer l'élément du curseur
const cursor = document.getElementById("cursor");

// Fonction pour déplacer le curseur
function moveCursor() {
  const wordSpans = wordsContainer.querySelectorAll("span");
  const currentWordSpan = wordSpans[currentWordIndex]; // Récupère le mot actif

  if (!currentWordSpan) {
    console.warn("Aucun mot actif pour déplacer le curseur !");
    cursor.style.display = "none"; // Cache le curseur si aucun mot actif
    return;
  }

  // Réaffiche le curseur s'il est caché
  cursor.style.display = "block";

  // Calcul de la position du curseur
  const rect = currentWordSpan.getBoundingClientRect();
  const letterWidth = rect.width / currentWordSpan.textContent.length;
  const cursorX = rect.left + window.scrollX + currentInput.length * letterWidth;

  cursor.style.transform = `translateX(${cursorX}px) translateY(${rect.top + window.scrollY}px)`;
}


// Mets à jour le curseur à chaque saisie
typingInput.addEventListener("input", () => {
  currentInput = typingInput.value.trim(); // Mise à jour de l'input utilisateur
  moveCursor();
});

// Appelle cette fonction au début
moveCursor();
