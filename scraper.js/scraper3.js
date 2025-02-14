const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true }); 
  const page = await browser.newPage();

  await page.goto('https://www.studyrama.com/revision-examen/bac/actualite/bac-2020-les-chiffres-definitifs-108549', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('div');

  const extractedText = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });

  if (extractedText) {
    const data = {
      extractedText: extractedText,
      url: 'https://www.studyrama.com/revision-examen/bac/actualite/bac-2020-les-chiffres-definitifs-108549',
      extractedAt: new Date().toISOString()
    };

    fs.writeFileSync('data3.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data2.json'");
  } else {
    console.log("Le texte spécifique n'a pas été trouvé.");
  }

  await browser.close();
})();
