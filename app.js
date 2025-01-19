// Liste de mots pour l'entraînement
const words = ["hello", "world", "javascript", "typing", "trainer", "fun", "speed", "accuracy"];

// Sélection des éléments DOM
const wordsContainer = document.getElementById("words-container");
const typingInput = document.getElementById("typing-input");

// Variables pour suivre la progression
let currentWordIndex = 0; // Index du mot en cours
let currentLetterIndex = 0; // Index de la lettre en cours

// Donne le focus au champ de saisie invisible dès que la page charge
typingInput.focus();

// Fonction pour afficher les mots
function displayWords() {
  wordsContainer.innerHTML = ""; // Vide le conteneur

  words.forEach(word => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word + " "; // Ajoute un espace après chaque mot
    wordsContainer.appendChild(wordSpan);
  });
}

// Fonction pour déplacer le curseur et colorer les lettres
function highlightCurrentLetter(status) {
  const wordSpans = wordsContainer.querySelectorAll("span");
  const currentWordSpan = wordSpans[currentWordIndex]; // Mot actuel

  // Supprime les anciennes classes
  currentWordSpan.classList.remove("correct", "incorrect");

  // Applique une nouvelle classe selon le statut
  if (status) {
    currentWordSpan.classList.add(status);
  }
}

// Écouter les frappes de l'utilisateur
typingInput.addEventListener("input", () => {
  const inputValue = typingInput.value; // Ce que l'utilisateur a tapé
  const currentWord = words[currentWordIndex]; // Mot attendu

  // Comparer la saisie avec le mot attendu
  if (inputValue === currentWord.slice(0, inputValue.length)) {
    // Correct : met à jour l'affichage
    highlightCurrentLetter("correct");
  } else {
    // Incorrect : indique une erreur
    highlightCurrentLetter("incorrect");
  }

  // Si l'utilisateur a fini de taper le mot
  if (inputValue === currentWord) {
    currentWordIndex++; // Passe au mot suivant
    currentLetterIndex = 0; // Réinitialise l'index des lettres
    typingInput.value = ""; // Vide le champ de saisie
  }
});

// Affiche les mots au chargement
displayWords();
