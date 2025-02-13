const fs = require('fs');

// Fichiers d'entrée et de sortie
const inputFile = 'data.json';
const outputFile = 'resultats.json';

// Regex améliorées pour capturer correctement les données
const regexTauxGlobal = /taux de réussite atteint\s+(\d+(?:[.,]\d+)?)%/i;
const regexCandidats = /([\d\s]+)\s+candidats/i;
const regexBacheliers = /([\d\s]+)\s+bacheliers/i;
const regexTauxFiliere = /(\d+(?:[.,]\d+)?)%\s+en\s+(général|technologique|professionnel)/gi;

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
      console.error("Erreur : Le fichier JSON ne contient pas 'extractedText'");
      return;
    }

    let extractedText = rawData.extractedText.trim();

    // Extraction des données
    let tauxGlobal = extractedText.match(regexTauxGlobal);
    let candidats = extractedText.match(regexCandidats);
    let bacheliers = extractedText.match(regexBacheliers);
    let tauxFiliereMatches = [...extractedText.matchAll(regexTauxFiliere)];

    // Correction des nombres en supprimant les espaces et en convertissant en int
    const parseNumber = (num) => parseInt(num.replace(/\s+/g, ''), 10);

    let cleanedData = {
      taux_reussite_global: tauxGlobal ? parseFloat(tauxGlobal[1].replace(',', '.')) : null,
      nombre_candidats: candidats ? parseNumber(candidats[1]) : null,
      nombre_bacheliers: bacheliers ? parseNumber(bacheliers[1]) : null,
      taux_par_filiere: {}
    };

    // Ajouter les taux de réussite par filière
    tauxFiliereMatches.forEach(match => {
      cleanedData.taux_par_filiere[match[2].toLowerCase()] = parseFloat(match[1].replace(',', '.'));
    });

    // Sauvegarde des données nettoyées
    fs.writeFileSync(outputFile, JSON.stringify(cleanedData, null, 2), 'utf-8');
    console.log(`Nettoyage terminé et sauvegardé dans '${outputFile}'`);

  } catch (error) {
    console.error("Erreur lors du traitement du JSON :", error);
  }
});
