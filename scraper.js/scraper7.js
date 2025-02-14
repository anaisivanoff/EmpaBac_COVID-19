const puppeteer = require('puppeteer');
const fs = require('fs'); 

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.letudiant.fr/bac/bac-2024-le-taux-de-reussite-atteint-91-4.html#:~:text=Dans%20les%20voies%20technologique%20et,la%20mention%20%22tr%C3%A8s%20bien%22.', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('html'); 

  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });

  const data = {
    extractedText: title,
    url: 'https://www.letudiant.fr/bac/bac-2024-le-taux-de-reussite-atteint-91-4.html',
    extractedAt: new Date().toISOString()
  };

  fs.writeFileSync('data7.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log("Les données ont été sauvegardées dans 'data8.json'");

  await browser.close();
})();
