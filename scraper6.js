const puppeteer = require('puppeteer');

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://etudiant.lefigaro.fr/article/bac-2023-taux-de-reussite-a-90-9-apres-le-rattrapage-en-baisse-de-0-2-point-par-rapport-a-2022_55d02e82-1d9e-11ee-8478-436437f3664a/'); // Remplace par ton URL

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
