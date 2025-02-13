const fs = require('fs');

// Fichiers d'entrée et sortie
const inputFile = 'data.json';
const outputFile = 'extraction.json';

// Expressions régulières pour détecter les types de bac
const bacRegex = /\b(général(?:e)?|technologique(?:s)?|professionnel(?:le)?)\b/i;

// Expressions pour les mots-clés
const candidatsRegex = /\b(candidat|candidats)\b/i;
const bacheliersRegex = /\b(bachelier|bacheliers)\b/i;

// Fonction pour nettoyer un nombre (supprimer espaces et remplacer virgules par points)
const cleanNumber = (num) => num.replace(/\s/g, '').replace(',', '.');

// Lire le fichier JSON brut
fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    console.error("❌ Erreur de lecture :", err);
    return;
  }

  try {
    let rawData = JSON.parse(data);
    if (!rawData.extractedText) {
      console.error("❌ Erreur : Le fichier JSON ne contient pas 'extractedText'");
      return;
    }

    let extractedText = rawData.extractedText.trim();
    let words = extractedText.split(/\s+/);
    let extractedData = [];

    // Fusionner les grands nombres (ex: "767 600" → "767600")
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].match(/^\d{1,3}$/) && words[i + 1].match(/^\d{3}$/)) {
        words[i] = words[i] + words[i + 1]; // Fusionner
        words.splice(i + 1, 1); // Supprimer la seconde partie
      }
    }

    // Parcours des mots pour détecter les nombres et leur contexte
    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      // Détection des nombres
      let numberMatch = word.match(/^(\d{1,3}(?:[\s.,]\d{3})*(?:[.,]\d+)?)$/);
      if (numberMatch) {
        let number = cleanNumber(numberMatch[1]);
        let typeDeBac = null;
        let type = null;

        // Vérifier les mots avant et après le nombre
        let beforeWords = words.slice(Math.max(0, i - 5), i).join(" ").toLowerCase();
        let afterWords = words.slice(i + 1, Math.min(words.length, i + 6)).join(" ").toLowerCase();

        // Vérifier si c'est un taux de réussite (présence de "%")
        if (afterWords.includes("%")) {
          type = "taux_reussite";
        }

        // Vérifier si c'est le nombre de candidats ou de bacheliers
        if (candidatsRegex.test(beforeWords) || candidatsRegex.test(afterWords)) {
          type = "nombre_candidats";
        }
        if (bacheliersRegex.test(beforeWords) || bacheliersRegex.test(afterWords)) {
          type = "nombre_bacheliers";
        }

        // Vérifier le type de bac avec regex
        let matchBefore = beforeWords.match(bacRegex);
        let matchAfter = afterWords.match(bacRegex);
        if (matchBefore) typeDeBac = matchBefore[1];
        if (matchAfter) typeDeBac = matchAfter[1];

        // Correction : Associer un taux de réussite à un bac si pas encore trouvé
        if (type === "taux_reussite" && !typeDeBac) {
          let context = words.slice(Math.max(0, i - 5), Math.min(words.length, i + 5)).join(" ");
          let matchContext = context.match(bacRegex);
          if (matchContext) typeDeBac = matchContext[1];
        }

        // Ajouter uniquement les valeurs utiles
        if (type) {
          let entry = { value: number, type };
          if (typeDeBac) entry.type_de_bac = typeDeBac;
          extractedData.push(entry);
        }
      }
    }

    // Sauvegarde dans un fichier JSON
    fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2), 'utf-8');
    console.log(`✅ Extraction terminée et sauvegardée dans '${outputFile}'`);

  } catch (error) {
    console.error("❌ Erreur lors du traitement JSON :", error);
  }
});
