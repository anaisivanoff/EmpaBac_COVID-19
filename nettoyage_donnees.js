const fs = require('fs');

// Fichier d'entrée (JSON brut contenant les paragraphes)
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

    let extractedText = rawData.extractedText;

    // Appliquer la regex pour extraire les informations
    let match = regex.exec(extractedText);
    if (match) {
      let tauxReussite = parseFloat(match[1].replace(',', '.'));
      let annee = parseInt(match[2]);

      let cleanedData = { annee, taux_reussite: tauxReussite };

      // Sauvegarder les données propres en JSON
      fs.writeFileSync(outputFile, JSON.stringify(cleanedData, null, 2), 'utf-8');
      console.log("Nettoyage terminé et sauvergardé dans 'cleaned_data.json'");
    } else {
      console.log("Aucune donnée valide trouvée");
    }
  } catch (error) {
    console.error("Erreur du traitement du JSON", error);
  }
});