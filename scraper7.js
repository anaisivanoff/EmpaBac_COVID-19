const puppeteer = require('puppeteer');

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://www.letudiant.fr/bac/bac-2024-le-taux-de-reussite-atteint-91-4.html#:~:text=Dans%20les%20voies%20technologique%20et,la%20mention%20%22tr%C3%A8s%20bien%22.'); // Remplace par ton URL

  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('html'); // Attendre l'élément principal

  // 4. Extraire du texte de la page
  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });
  console.log("L'étudiant :", title);
  // 5. Fermer le navigateur
  await browser.close();
})();
