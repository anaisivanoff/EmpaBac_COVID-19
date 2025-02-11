const puppeteer = require('puppeteer');

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://groupe-reussite.fr/ressources/blog/evolution-taux-reussite-bac/');

  // 3. Attendre que la page soit chargée complètement
  await page.waitForSelector('html'); // Attendre l'élément principal

  // 4. Extraire du texte de la page
  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });

  console.log("Taux de réussite au bac : évolution, résultats, mentions :", title);

  // 5. Fermer le navigateur
  +
  await browser.close();
})();
