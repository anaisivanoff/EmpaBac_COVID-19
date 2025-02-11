const puppeteer = require('puppeteer');
(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();
  // 2. Aller sur le site cible
  await page.goto('https://archives-statistiques-depp.education.gouv.fr/Default/doc/SYRACUSE/44034/resultats-definitifs-de-la-session-2018-du-baccalaureat-l-effectif-de-bacheliers-poursuit-sa-progres?_lg=fr-FR');
  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('div'); // Attendre l'élément principal
  // 4. Extraire du texte de la page
  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });
  console.log("Direction de l'évaluation, de la prospective et de la performance :", title);
  // 5. Fermer le navigateur
  +
  await browser.close();
})();
