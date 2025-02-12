const puppeteer = require('puppeteer');
const fs = require('fs'); // Ajoute le module fs pour écrire dans un fichier

(async () => {
  // 1. Lancer le navigateur
  const browser = await puppeteer.launch({ headless: true }); // "false" pour voir le navigateur s'ouvrir
  const page = await browser.newPage();
  // 2. Aller sur le site cible
  await page.goto('https://archives-statistiques-depp.education.gouv.fr/Default/doc/SYRACUSE/44034/resultats-definitifs-de-la-session-2018-du-baccalaureat-l-effectif-de-bacheliers-poursuit-sa-progres?_lg=fr-FR', { waitUntil: 'domcontentloaded' });
  // 3. Attendre qu'un élément spécifique soit chargé (évite les erreurs)
  await page.waitForSelector('div');
  // 4. Extraire du texte spécifique de la page
  const specificText = await page.evaluate(() => {
    const paragraphs = document.querySelectorAll('p'); // On sélectionne tous les paragraphes
    for (let para of paragraphs) {
      if (para.innerText.includes("Avec 767 600 candidats et 677 300 bacheliers")) {
        return para.innerText; // Retourner le texte du paragraphe trouvé
      }
    }
    return null; // Si le texte n'est pas trouvé, on retourne null
  });
  // 5. Vérifier si le texte a été trouvé et créer l'objet
  if (specificText) {
    const data = {
      extractedText: specificText,
      url: 'https://archives-statistiques-depp.education.gouv.fr/Default/doc/SYRACUSE/44034/resultats-definitifs-de-la-session-2018-du-baccalaureat-l-effectif-de-bacheliers-poursuit-sa-progres?_lg=fr-FR',
      extractedAt: new Date().toISOString()
    };
    // 6. Sauvegarder les données dans un fichier JSON
    fs.writeFileSync('data1.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log("Les données ont été sauvegardées dans 'data.json'");
  } else {
    console.log("Le texte spécifique n'a pas été trouvé.");
  }
  // 7. Fermer le navigateur
  await browser.close();
})();
