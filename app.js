// ---------------------------------- 1. Générer une liste de mots -----------------------------------
// JS file: nothing here yet, but soon!
console.log("Ready to code!");
// Liste de mots pour l'entraînement
const words = ["hello", "world", "javascript", "typing", "trainer", "fun", "speed", "accuracy"];

// Sélectionner le conteneur où les mots s'afficheront
const wordsContainer = document.getElementById("words-container");

// Fonction pour afficher les mots
function displayWords() {
  // Réinitialise le conteneur
  wordsContainer.innerHTML = "";

  // Génère les mots sous forme de <span>
  words.forEach(word => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word + " "; // Ajoute un espace après chaque mot
    wordsContainer.appendChild(wordSpan);
  });
}

// Appelle la fonction au chargement
displayWords();


// ---------------------------------- 2. Capturer la saisie utilisateur -----------------------------------
// Champ de saisie (invisible)
const typingInput = document.getElementById("typing-input");

// Variables pour suivre la progression
let currentWordIndex = 0; // Index du mot en cours
let currentLetterIndex = 0; // Index de la lettre en cours

// Écouter les frappes de l'utilisateur
typingInput.addEventListener("input", () => {
  const inputValue = typingInput.value; // Ce que l'utilisateur a tapé
  const currentWord = words[currentWordIndex]; // Mot attendu

  // Comparer la saisie avec le mot attendu
  if (inputValue === currentWord.slice(0, inputValue.length)) {
    // Correct : on met à jour le curseur
    highlightCurrentLetter("correct");
  } else {
    // Incorrect : on met en rouge
    highlightCurrentLetter("incorrect");
  }

  // Si le mot est terminé
  if (inputValue === currentWord) {
    // Passe au mot suivant
    currentWordIndex++;
    currentLetterIndex = 0;
    typingInput.value = ""; // Réinitialise le champ
  }
});

// ---------------------------------- 3. Gérer le curseur et les couleurs -----------------------------------
// Fonction pour déplacer le curseur et colorer les lettres
function highlightCurrentLetter(status) {
    const wordSpans = wordsContainer.querySelectorAll("span");
    const currentWordSpan = wordSpans[currentWordIndex]; // Récupère le mot actuel
  
    // Supprime les anciennes classes
    currentWordSpan.classList.remove("correct", "incorrect");
  
    // Applique une nouvelle classe selon le statut
    currentWordSpan.classList.add(status);
  
    // Déplace le curseur (facultatif : tu peux améliorer cette logique plus tard)
    const cursor = document.getElementById("cursor");
    cursor.style.left = `${currentWordSpan.offsetLeft + currentLetterIndex * 10}px`; // Position du curseur
}
