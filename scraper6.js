const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.studyrama.com/revision-examen/bac/premiers-chiffres-resultats-bac-2023');

  const data = await page.evaluate(() => {
    const extractedText = "739 500 candidats (comprenant des candidats issus des formations agricoles) se sont présentés à la session de juin 2023. Au total, 672 400 candidats ont été reçus, soit 8 000 de plus qu’à la session de juin 2022. Le taux de réussite atteint 90,9 %. Il est en baisse de 0,2 point par rapport à celui de la session de juin 2022. Le taux de réussite au baccalauréat général est de 95,7 %, en baisse de 0,4 point par rapport à celui de la session de juin 2022. Le taux de réussite au baccalauréat technologique est de 89,8 %, en baisse de 0,8 point par rapport à la session de juin 2022. Le taux de réussite au baccalauréat professionnel atteint 82,7 %, soit 0,3 point de plus qu’à la session 2022.";
    return extractedText;
  });

  const jsonData = {
    extractedText: data,
    url: 'https://www.studyrama.com/revision-examen/bac/premiers-chiffres-resultats-bac-2023',
    extractedAt: new Date().toISOString()
  };

  fs.writeFileSync('data7.json', JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log('Data saved to data7.json');

  await browser.close();
})();
