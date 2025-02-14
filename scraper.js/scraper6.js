const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://www.studyrama.com/revision-examen/bac/premiers-chiffres-resultats-bac-2023');

  const data = await page.evaluate(() => {
    const elements = document.querySelectorAll('p');
    let extractedText = '';

    elements.forEach(element => {
      extractedText += element.innerText + ' ';
    });

    return extractedText;
  });
  const jsonData = {

    extractedText: data,
    url: 'https://www.studyrama.com/revision-examen/bac/premiers-chiffres-resultats-bac-2023',
    extractedAt: new Date().toISOString()
    
  };

  fs.writeFileSync('data6.json', JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log('Data saved to data7.json');

  await browser.close();
})();
