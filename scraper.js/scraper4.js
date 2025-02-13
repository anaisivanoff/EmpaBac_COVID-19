const puppeteer = require('puppeteer');
const fs = require('fs'); // Ajoute le module fs pour écrire dans un fichier

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://www.studyrama.com/revision-examen/bac/resultats-du-bac/bac-2021-les-resultats-provisoires-108636#:~:text=R%C3%A9sultats%20Bac%202021%20%3A%2093.8%25%20de%20r%C3%A9ussite%20avant%20la%20session%20de%20rattrapage', { waitUntil: 'domcontentloaded' });

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
      url: 'https://www.studyrama.com/revision-examen/bac/resultats-du-bac/bac-2021-les-resultats-provisoires-108636#:~:text=R%C3%A9sultats%20Bac%202021%20%3A%2093.8%25%20de%20r%C3%A9ussite%20avant%20la%20session%20de%20rattrapage',
      extractedAt: new Date().toISOString()
    };

    // 6. Sauvegarder les données dans un fichier JSON
    fs.writeFileSync('data4.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data4.json'");
  } else {
    console.log("Aucune donnée extraite.");
  }

  // 7. Fermer le navigateur
  await browser.close();
})();
