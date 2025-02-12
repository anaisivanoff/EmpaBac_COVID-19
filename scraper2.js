const puppeteer = require('puppeteer');
const fs = require('fs'); // Module pour écrire dans un fichier
(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://groupe-reussite.fr/ressources/blog/evolution-taux-reussite-bac/', { waitUntil: 'domcontentloaded' });

  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('body');

  // 4. Extraire le texte spécifique
  const specificText = await page.evaluate(() => {
    const elements = document.querySelectorAll('div'); // Sélectionne tous les paragraphes
    for (let element of elements) {
      if (element.innerText.includes("Taux de réussite au bac : évolution, résultats, mentions")) {
        return element.innerText; // Retourne le texte trouvé
      }
    }
    return null; // Si le texte n'est pas trouvé
  });
  // 5. Vérifier si le texte a été trouvé et sauvegarder
  if (specificText) {
    const data = {
      extractedText: specificText,
      url: 'https://groupe-reussite.fr/ressources/blog/evolution-taux-reussite-bac/',
      extractedAt: new Date().toISOString()
    };
    // Sauvegarde des données dans un fichier JSON
    fs.writeFileSync('data1.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data1.json'");
  } else {
    console.log("Le texte spécifique n'a pas été trouvé.");
  }
  // 6. Fermer le navigateur
  await browser.close();
})();
