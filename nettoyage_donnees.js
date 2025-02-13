const fs = require('fs');

// Charger les données depuis le fichier `data.json`
const rawData = fs.readFileSync('data.json', 'utf8');
const scrapedData = JSON.parse(rawData);

// Fonction de nettoyage des données
function nettoyerDonnees(extractedText) {
  // Expressions régulières pour extraire les informations spécifiques
  const regexCandidats = /Avec (\d{1,3}(?: \d{3})*) candidats/;
  const regexBacheliers = /(\d{1,3}(?: \d{3})*) bacheliers/;
  const regexTauxReussiteGlobal = /taux de réussite atteint (\d+,\d+)/;
  const regexTauxGeneral = /(\d+,\d+) % en général/;
  const regexTauxTechnologique = /(\d+,\d+) % en technologique/;
  const regexTauxProfessionnel = /(\d+,\d+) % en professionnel/;

  // Extraction des données à l'aide des expressions régulières
  const nombreCandidatsMatch = extractedText.match(regexCandidats);
  const nombreBacheliersMatch = extractedText.match(regexBacheliers);
  const tauxReussiteGlobalMatch = extractedText.match(regexTauxReussiteGlobal);
  const tauxGeneralMatch = extractedText.match(regexTauxGeneral);
  const tauxTechnologiqueMatch = extractedText.match(regexTauxTechnologique);
  const tauxProfessionnelMatch = extractedText.match(regexTauxProfessionnel);

  // Nettoyer et convertir les valeurs extraites
  const cleanedData = {
    nombreCandidats: nombreCandidatsMatch ? parseInt(nombreCandidatsMatch[1].replace(/ /g, ''), 10) : null,
    nombreBacheliers: nombreBacheliersMatch ? parseInt(nombreBacheliersMatch[1].replace(/ /g, ''), 10) : null,
    tauxReussite: {
      global: tauxReussiteGlobalMatch ? parseFloat(tauxReussiteGlobalMatch[1].replace(',', '.')) : null,
      general: tauxGeneralMatch ? parseFloat(tauxGeneralMatch[1].replace(',', '.')) : null,
      technologique: tauxTechnologiqueMatch ? parseFloat(tauxTechnologiqueMatch[1].replace(',', '.')) : null,
      professionnel: tauxProfessionnelMatch ? parseFloat(tauxProfessionnelMatch[1].replace(',', '.')) : null,
    }
  };

  return cleanedData;
}

// Vérifier si le fichier `data.json` existe et procéder au nettoyage
if (scrapedData && scrapedData.extractedText) {
  const cleanedData = nettoyerDonnees(scrapedData.extractedText);

  // Sauvegarder les données nettoyées dans un fichier `donnees.json`
  fs.writeFileSync('donnees.json', JSON.stringify(cleanedData, null, 2), 'utf8');
  console.log("Les données nettoyées ont été sauvegardées dans 'donnees.json'");
} else {
  console.log("Aucune donnée extraite dans 'data.json'");
}
