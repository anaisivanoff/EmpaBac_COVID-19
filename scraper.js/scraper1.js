const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://archives-statistiques-depp.education.gouv.fr/Default/doc/SYRACUSE/44034/resultats-definitifs-de-la-session-2018-du-baccalaureat-l-effectif-de-bacheliers-poursuit-sa-progres?_lg=fr-FR', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('div');

  const specificText = await page.evaluate(() => {
    const paragraphs = document.querySelectorAll('p'); 
    for (let para of paragraphs) {
      if (para.innerText.includes("Avec 767 600 candidats et 677 300 bacheliers")) {
        return para.innerText; 
      }
    }
    return null;
  });

  if (specificText) {
    const data = {
      extractedText: specificText,
      url: 'https://archives-statistiques-depp.education.gouv.fr/Default/doc/SYRACUSE/44034/resultats-definitifs-de-la-session-2018-du-baccalaureat-l-effectif-de-bacheliers-poursuit-sa-progres?_lg=fr-FR',
      extractedAt: new Date().toISOString()
    };

    fs.writeFileSync('data1.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data.json'");
  } else {
    console.log("Le texte spécifique n'a pas été trouvé.");
  }

  await browser.close();
})();
