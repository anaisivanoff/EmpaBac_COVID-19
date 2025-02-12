const puppeteer = require('puppeteer');
const fs = require('fs'); // Ajoute le module fs pour écrire dans un fichier

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://www.education.gouv.fr/resultats-definitifs-de-la-session-2021-du-baccalaureat-340697', { waitUntil: 'domcontentloaded' });

  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('div'); // Attendre l'élément principal

  // 4. Extraire du texte de la page
  const extractedText = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });

  // 5. Vérifier si le texte a été trouvé et créer l'objet
  if (extractedText) {
    const data = {
      extractedText: extractedText,
      url: 'https://www.education.gouv.fr/resultats-definitifs-de-la-session-2021-du-baccalaureat-340697',
      extractedAt: new Date().toISOString()
    };

    // 6. Sauvegarder les données dans un fichier JSON
    fs.writeFileSync('data3.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data3.json'");
  } else {
    console.log("Le texte spécifique n'a pas été trouvé.");
  }

  // 7. Fermer le navigateur
  await browser.close();
})();
