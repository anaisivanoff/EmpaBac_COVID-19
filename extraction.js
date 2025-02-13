const fs = require('fs');

// Fichiers d'entrée et de sortie
const inputFile = 'data.json';
const outputFile = 'extraction.json';

// Liste des mots-clés pour identifier le type de bac
const bacTypes = ["général", "générale", "technologique", "professionnel", "professionnelle"];

// Fonction pour nettoyer un nombre (supprimer les espaces et remplacer les virgules par des points)
const cleanNumber = (num) => num.replace(/\s/g, '').replace(',', '.');

// Lire le fichier JSON brut
fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier JSON :", err);
    return;
  }

  try {
    let rawData = JSON.parse(data);

    if (!rawData.extractedText) {
      console.error("Erreur : Le fichier JSON ne contient pas 'extractedText'");
      return;
    }

    let extractedText = rawData.extractedText.trim();
    console.log("🔍 Texte extrait :", extractedText);

    let words = extractedText.split(/\s+/);
    let extractedData = [];

    // Parcours des mots pour détecter les nombres et leur contexte
    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      // Détection des nombres (entiers ou décimaux)
      let numberMatch = word.match(/^(\d{1,3}(?:[\s.,]\d{3})*(?:[.,]\d+)?)$/);
      if (numberMatch) {
        let number = cleanNumber(numberMatch[1]);
        let typeDeBac = null;
        let type = null;

        // Vérifier les mots avant et après
        let before = words[i - 1] ? words[i - 1].toLowerCase() : null;
        let after = words[i + 1] ? words[i + 1].toLowerCase() : null;

        // Détection du type de bac
        if (bacTypes.includes(before)) typeDeBac = before;
        if (bacTypes.includes(after)) typeDeBac = after;

        // Détection d'un taux de réussite (si "%" suit le nombre)
        if (after === "%") type = "taux_reussite";

        // Ajout des données si elles sont pertinentes
        if (type || typeDeBac) {
          extractedData.push({
            value: number,
            ...(typeDeBac && { type_de_bac: typeDeBac }),
            ...(type && { type })
          });

          console.log(`Détecté: ${number} | Bac: ${typeDeBac || "N/A"} | Type: ${type || "N/A"}`);
        }
      }
    }

    // Sauvegarde des données extraites dans un fichier JSON
    fs.writeFileSync(outputFile, JSON.stringify(extractedData, null, 2), 'utf-8');
    console.log(`Extraction terminée et sauvegardée dans '${outputFile}'`);

  } catch (error) {
    console.error("Erreur lors du traitement du fichier JSON :", error);
  }
});
