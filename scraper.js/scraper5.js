const puppeteer = require('puppeteer');
const fs = require('fs'); 

(async () => {
  const browser = await puppeteer.launch({ headless: true }); 
  const page = await browser.newPage();

  await page.goto('https://www.studyrama.com/revision-examen/bac/actualite/bac-2022-le-taux-de-reussite-atteint-91-1-apres-le-109729', { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('html'); 

  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });
  
  if (title) {
    const data = {
      extractedText: title,
      url: 'https://www.studyrama.com/revision-examen/bac/actualite/bac-2022-le-taux-de-reussite-atteint-91-1-apres-le-109729',
      extractedAt: new Date().toISOString()
    };

    fs.writeFileSync('data5.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data5.json'");
  } else {
    console.log("Aucune donnée extraite.");
  }

  await browser.close();
})();
