const puppeteer = require('puppeteer');
const fs = require('fs'); // Ajoute le module fs pour écrire dans un fichier

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://etudiant.lefigaro.fr/article/bac-2022-un-taux-de-reussite-en-baisse_f4cd52d6-ff99-11ec-9d0f-12f873f0defe/', { waitUntil: 'domcontentloaded' });

  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('html'); // Attendre l'élément principal

  // 4. Extraire du texte de la page
  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });
  
  // 5. Vérifier si le texte a été extrait et créer l'objet
  if (title) {
    const data = {
      extractedText: title,
      url: 'https://etudiant.lefigaro.fr/article/bac-2022-un-taux-de-reussite-en-baisse_f4cd52d6-ff99-11ec-9d0f-12f873f0defe/',
      extractedAt: new Date().toISOString()
    };

    // 6. Sauvegarder les données dans un fichier JSON
    fs.writeFileSync('data6.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data6.json'");
  } else {
    console.log("Aucune donnée extraite.");
  }

  // 7. Fermer le navigateur
  await browser.close();
})();
