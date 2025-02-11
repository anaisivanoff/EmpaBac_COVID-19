const puppeteer = require('puppeteer');

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();

  // 2. Aller sur le site cible
  await page.goto('https://etudiant.lefigaro.fr/article/bac-2022-un-taux-de-reussite-en-baisse_f4cd52d6-ff99-11ec-9d0f-12f873f0defe/'); // Remplace par ton URL

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
