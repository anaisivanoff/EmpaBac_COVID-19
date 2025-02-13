const fs = require('fs');

// Fichier d'entrée (JSON brut contenant le texte)
const inputFile = 'data.json';
const outputFile = 'resultats.json';

// Regex pour capturer (année, académie, taux de réussite)
const regex = /(\d{4}).*?\b(académie de ([A-Za-zÀ-ÿ-]+)).*?(\d+(?:\.\d+)?)%/g;

// Lire le fichier JSON brut
fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err);
    return;
  }

  try {
    // Convertir le JSON brut en objet JavaScript
    let rawData = JSON.parse(data);

    if (!rawData.extractedText) {
      console.error("Le fichier JSON doit contenir un tableau de paragraphes !");
      return;
    }

    let extractedText = rawData.extractedText.trim();

    // Appliquer la regex pour extraire les informations
    const regex = /(\d{4}).*?(?:(\d+(?:[.,]\d+)?)%.*?(général|technologique|professionnel|total|global))+/gi;
    let matches = [...extractedText.matchAll(regex)];

    if (matches.length === 0) {
      console.log("Aucune donnée valide trouvée");
      return;
    }

    let cleanedData = matches.map(match => ({
      annee: parseInt(match[1]),
      taux_reussite: parseFloat(match[2].replace(',', '.')),
      categorie: match[3] || "global"
    }));
 
    // Sauvegarder les données nettoyées en JSON
    fs.writeFileSync(resultOutputFile, JSON.stringify(cleanedData, null, 2), 'utf-8');
    console.log(`Nettoyage terminé et sauvegardé dans '${resultOutputFile}'`);
 
  } catch (error) {
    console.error("Erreur lors du traitement du JSON :", error);
  }
});