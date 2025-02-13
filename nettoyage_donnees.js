const fs = require('fs');

// Fichiers d'entrée et de sortie
const inputFile = 'data.json';
const outputFile = 'resultats.json';

// Regex pour extraire les données
const regexTauxGlobal = /taux de réussite atteint\s+(\d+(?:[.,]\d+)?)%/i;
const regexCandidats = /([\d\s]+)\s+candidats/i;
const regexBacheliers = /([\d\s]+)\s+bacheliers/i;
const regexTauxGeneral = /(\d+(?:[.,]\d+)?)%\s+en\s+général/i;
const regexTauxTechnologique = /(\d+(?:[.,]\d+)?)%\s+en\s+technologique/i;
const regexTauxProfessionnel = /(\d+(?:[.,]\d+)?)%\s+en\s+professionnel/i;

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
    let tauxGlobalMatch = extractedText.match(regexTauxGlobal);
    let candidatsMatch = extractedText.match(regexCandidats);
    let bacheliersMatch = extractedText.match(regexBacheliers);
    let tauxGeneralMatch = extractedText.match(regexTauxGeneral);
    let tauxTechnologiqueMatch = extractedText.match(regexTauxTechnologique);
    let tauxProfessionnelMatch = extractedText.match(regexTauxProfessionnel);

    // Fonction pour convertir les nombres avec espaces
    const parseNumber = (num) => parseInt(num.replace(/\s+/g, ''), 10);

    let cleanedData = {
      taux_reussite_global: tauxGlobalMatch ? parseFloat(tauxGlobalMatch[1].replace(',', '.')) : null,
      nombre_candidats: candidatsMatch ? parseNumber(candidatsMatch[1]) : null,
      nombre_bacheliers: bacheliersMatch ? parseNumber(bacheliersMatch[1]) : null,
      taux_reussite_general: tauxGeneralMatch ? parseFloat(tauxGeneralMatch[1].replace(',', '.')) : null,
      taux_reussite_technologique: tauxTechnologiqueMatch ? parseFloat(tauxTechnologiqueMatch[1].replace(',', '.')) : null,
      taux_reussite_professionnel: tauxProfessionnelMatch ? parseFloat(tauxProfessionnelMatch[1].replace(',', '.')) : null
    };

    // Sauvegarde des données nettoyées
    fs.writeFileSync(outputFile, JSON.stringify(cleanedData, null, 2), 'utf-8');
    console.log(`Nettoyage terminé et sauvegardé dans '${outputFile}'`);

  } catch (error) {
    console.error("Erreur lors du traitement du JSON :", error);
  }
});
