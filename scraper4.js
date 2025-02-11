const puppeteer = require('puppeteer');
(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();
  // 2. Aller sur le site cible
  await page.goto('https://www.education.gouv.fr/resultats-definitifs-de-la-session-2021-du-baccalaureat-340697');
  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('div'); // Attendre l'élément principal
  // 4. Extraire du texte de la page
  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });
  console.log("Résultats définitifs de la session 2021 du baccalauréat :", title);
  // 5. Fermer le navigateur
  +
  await browser.close();
})();
