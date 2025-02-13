const fs = require('fs');

// Charger les données depuis les fichiers `data1.json` (2018) et `data2.json` (2019)
const rawData2018 = fs.readFileSync('data1.json', 'utf8');
const rawData2019 = fs.readFileSync('data2.json', 'utf8');
const rawData2020 = fs.readFileSync('data3.json', 'utf8');
const rawData2021 = fs.readFileSync('data4.json', 'utf8');
const rawData2022 = fs.readFileSync('data5.json', 'utf8');
const rawData2023 = fs.readFileSync('data6.json', 'utf8');
const rawData2024 = fs.readFileSync('data7.json', 'utf8');
const scrapedData2018 = JSON.parse(rawData2018);
const scrapedData2019 = JSON.parse(rawData2019);
const scrapedData2020 = JSON.parse(rawData2020);
const scrapedData2021 = JSON.parse(rawData2021);
const scrapedData2022 = JSON.parse(rawData2022);
const scrapedData2023 = JSON.parse(rawData2023);
const scrapedData2024 = JSON.parse(rawData2024);


// Fonction de nettoyage des données
function nettoyerDonnees(extractedText) {
  // Expressions régulières pour extraire les informations spécifiques
  const regexCandidats = /Avec (\d{1,3}(?: \d{3})*) candidats/;
  const regexBacheliers = /(\d{1,3}(?: \d{3})*) bacheliers/;
  const regexTauxReussiteGlobal = /taux de réussite atteint (\d+,\d+)/;
  const regexTauxGeneral = /(?:baccalauréat\s+général\s+)?(\d+,\d+) %\s+en général/;
  const regexTauxTechnologique = /(?:baccalauréat\s+technologique\s+)?(\d+,\d+) %\s+en technologique/;
  const regexTauxProfessionnel = /(?:baccalauréat\s+professionnel\s+)?(\d+,\d+) %\s+en professionnel/;

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

// Fonction de création des données finales
function processData() {
  const cleanedData2018 = nettoyerDonnees(scrapedData2018.extractedText);
  const cleanedData2019 = nettoyerDonnees(scrapedData2019.extractedText);
  const cleanedData2020 = nettoyerDonnees(scrapedData2020.extractedText);
  const cleanedData2021 = nettoyerDonnees(scrapedData2021.extractedText);
  const cleanedData2022 = nettoyerDonnees(scrapedData2022.extractedText);
  const cleanedData2023 = nettoyerDonnees(scrapedData2023.extractedText);
  const cleanedData2024 = nettoyerDonnees(scrapedData2024.extractedText);

  const donneesFinales = {
    "2018": cleanedData2018,
    "2019": cleanedData2019,
    "2020": cleanedData2020,
    "2021": cleanedData2021,
    "2022": cleanedData2022,
    "2023": cleanedData2023,
    "2024": cleanedData2024
  };

  // Sauvegarder les données nettoyées dans un fichier `donnees.json`
  fs.writeFileSync('donnees.json', JSON.stringify(donneesFinales, null, 2), 'utf8');
  console.log("Les données nettoyées ont été sauvegardées dans 'donnees.json'");
}

// Exécution du traitement des données
processData();
