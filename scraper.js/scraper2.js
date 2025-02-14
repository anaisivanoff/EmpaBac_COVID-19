const puppeteer = require('puppeteer');
const fs = require('fs'); 

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://groupe-reussite.fr/ressources/blog/evolution-taux-reussite-bac/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('body');

  const specificText = await page.evaluate(() => {
    const elements = document.querySelectorAll('div');
    for (let element of elements) {
      if (element.innerText.includes("Taux de réussite au bac : évolution, résultats, mentions")) {
        return element.innerText; 
      }
    }
    return null;
  });

  if (specificText) {
    const data = {
      extractedText: specificText,
      url: 'https://groupe-reussite.fr/ressources/blog/evolution-taux-reussite-bac/',
      extractedAt: new Date().toISOString()
    };

    fs.writeFileSync('data2.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data1.json'");
  } else {
    console.log("Le texte spécifique n'a pas été trouvé.");
  }

  await browser.close();
})();
