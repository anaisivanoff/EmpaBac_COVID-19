const puppeteer = require('puppeteer');
const fs = require('fs'); 

(async () => {
  const browser = await puppeteer.launch({ headless: true }); 
  const page = await browser.newPage();

  await page.goto('https://www.studyrama.com/revision-examen/bac/resultats-du-bac/bac-2021-les-resultats-provisoires-108636#:~:text=R%C3%A9sultats%20Bac%202021%20%3A%2093.8%25%20de%20r%C3%A9ussite%20avant%20la%20session%20de%20rattrapage', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('html'); 

  const title = await page.evaluate(() => {
    return document.querySelector('body').innerText;
  });
  
  if (title) {
    const data = {
      extractedText: title,
      url: 'https://www.studyrama.com/revision-examen/bac/resultats-du-bac/bac-2021-les-resultats-provisoires-108636#:~:text=R%C3%A9sultats%20Bac%202021%20%3A%2093.8%25%20de%20r%C3%A9ussite%20avant%20la%20session%20de%20rattrapage',
      extractedAt: new Date().toISOString()
    };

    fs.writeFileSync('data4.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data4.json'");
  } else {
    console.log("Aucune donnée extraite.");
  }

  await browser.close();
})();
