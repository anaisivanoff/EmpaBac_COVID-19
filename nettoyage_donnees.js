const fs = require('fs');

const rawData2018 = fs.readFileSync('./data.json/data1.json', 'utf8');
const rawData2019 = fs.readFileSync('./data.json/data2.json', 'utf8');
const rawData2020 = fs.readFileSync('./data.json/data3.json', 'utf8');
const rawData2021 = fs.readFileSync('./data.json/data4.json', 'utf8');
const rawData2022 = fs.readFileSync('./data.json/data5.json', 'utf8');
const rawData2023 = fs.readFileSync('./data.json/data6.json', 'utf8');
const rawData2024 = fs.readFileSync('./data.json/data7.json', 'utf8');

const scrapedData = {
    "2018": JSON.parse(rawData2018),
    "2019": JSON.parse(rawData2019),
    "2020": JSON.parse(rawData2020),
    "2021": JSON.parse(rawData2021),
    "2022": JSON.parse(rawData2022),
    "2023": JSON.parse(rawData2023),
    "2024": JSON.parse(rawData2024),
};

function extraireTauxGeneral(texte) {
    const mots = texte.split(/\s+/);
    let resultats = [];
    for (let i = 0; i < mots.length; i++) {
        if (mots[i].match(/^\d+,\d+%?$/)) {
            let nombre = mots[i].replace('%', '');
            let contexte = mots.slice(Math.max(0, i - 5), i + 6);
            let cleanedContexte = contexte.join(' ').replace(/[\.,;:()]/g, '');
            if (cleanedContexte.toLowerCase().includes("général")) {
                resultats.push(parseFloat(nombre.replace(',', '.')));
            }
        }
    }
    return resultats.length > 0 ? resultats[0] : null;
}

function extraireTauxTechnologique(texte) {
  const mots = texte.split(/\s+/);
  let resultats = [];
  for (let i = 0; i < mots.length; i++) {
      if (mots[i].match(/^\d+,\d+%?$/)) {
          let nombre = mots[i].replace('%', '');
          let contexte = mots.slice(Math.max(0, i - 5), i + 6);
          let cleanedContexte = contexte.join(' ').replace(/[\.,;:()]/g, '');
          if (cleanedContexte.toLowerCase().includes("technologique")) {
              resultats.push(parseFloat(nombre.replace(',', '.')));
          }
      }
  }
  return resultats.length > 0 ? resultats[0] : null;
}

function extraireTauxProfessionnel(texte) {
  const mots = texte.split(/\s+/);
  let resultats = [];
  for (let i = 0; i < mots.length; i++) {
      if (mots[i].match(/^\d+,\d+%?$/)) {
          let nombre = mots[i].replace('%', '');
          let contexte = mots.slice(Math.max(0, i - 5), i + 6);
          let cleanedContexte = contexte.join(' ').replace(/[\.,;:()]/g, '');
          if (cleanedContexte.toLowerCase().includes("professionnel")) {
              resultats.push(parseFloat(nombre.replace(',', '.')));
          }
      }
  }
  return resultats.length > 0 ? resultats[0] : null;
}

function nettoyerDonnees(extractedText, annee) {
    const regexCandidats = /Avec (\d{1,3}(?: \d{3})*) candidats/;
    const regexBacheliers = /(\d{1,3}(?: \d{3})*) bacheliers/;
    const regexTauxReussiteGlobal = /taux de réussite atteint (\d+,\d+)/;

    const nombreCandidatsMatch = extractedText.match(regexCandidats);
    const nombreBacheliersMatch = extractedText.match(regexBacheliers);
    const tauxReussiteGlobalMatch = extractedText.match(regexTauxReussiteGlobal);
    
    const tauxGeneral = annee === "2019" ? null : extraireTauxGeneral(extractedText);
    const tauxTechnologique = annee === "2019" ? null : extraireTauxTechnologique(extractedText);
    const tauxProfessionnel = annee === "2019" ? null : extraireTauxProfessionnel(extractedText);

    let cleanedData = {
        nombreCandidats: nombreCandidatsMatch ? parseInt(nombreCandidatsMatch[1].replace(/ /g, ''), 10) : null,
        nombreBacheliers: nombreBacheliersMatch ? parseInt(nombreBacheliersMatch[1].replace(/ /g, ''), 10) : null,
        tauxReussite: {
            global: tauxReussiteGlobalMatch ? parseFloat(tauxReussiteGlobalMatch[1].replace(',', '.')) : null
        }
    };

    if (annee !== "2019") {
        cleanedData.tauxReussite.general = tauxGeneral;
        cleanedData.tauxReussite.technologique = tauxTechnologique;
        cleanedData.tauxReussite.professionnel = tauxProfessionnel;
    }

    return cleanedData;
}

function processData() {
    let donneesFinales = {};

    for (let annee in scrapedData) {
        donneesFinales[annee] = nettoyerDonnees(scrapedData[annee].extractedText, annee);
    }

    fs.writeFileSync('donnees.json', JSON.stringify(donneesFinales, null, 2), 'utf8');
    console.log("Les données nettoyées ont été sauvegardées dans 'donnees.json'");
}

processData();
