const puppeteer = require('puppeteer');
const fs = require('fs'); // Ajoute le module fs pour écrire dans un fichier

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://www.letudiant.fr/bac/bac-2024-le-taux-de-reussite-atteint-91-4.html#:~:text=Dans%20les%20voies%20technologique%20et,la%20mention%20%22tr%C3%A8s%20bien%22.', { waitUntil: 'domcontentloaded' });

  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('html'); // Attendre l'élément principal

  // 4. Extraire du texte de la page
  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });

  // 5. Créer un objet pour stocker les données extraites
  const data = {
    extractedText: title,
    url: 'https://www.letudiant.fr/bac/bac-2024-le-taux-de-reussite-atteint-91-4.html',
    extractedAt: new Date().toISOString()
  };

  // 6. Sauvegarder les données dans un fichier JSON
  fs.writeFileSync('data8.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log("Les données ont été sauvegardées dans 'data8.json'");

  // 7. Fermer le navigateur
  await browser.close();
})();
