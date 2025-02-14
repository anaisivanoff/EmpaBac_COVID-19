const fs = require('fs');

// Charger le fichier JSON nettoyé
let data = JSON.parse(fs.readFileSync("donnees.json", "utf8"));

// Extraire les taux de réussite globaux (2018-2024)
let tauxReussite = {};
Object.keys(data).forEach(annee => {
    tauxReussite[annee] = data[annee].tauxReussite.global;
});

console.log("\n Taux de réussite global par année :");
Object.keys(tauxReussite).forEach(annee => {
    console.log(`    ${annee} : ${tauxReussite[annee]}%`);
});

// Calculer l’évolution du taux de réussite
console.log("\n Évolution du taux de réussite par rapport à l'année précédente :");
let annees = Object.keys(tauxReussite);
for (let i = 1; i < annees.length; i++) {
    let prevYear = annees[i - 1];
    let currYear = annees[i];
    let variation = (tauxReussite[currYear] - tauxReussite[prevYear]).toFixed(2);
    let symbole = variation >= 0 ? "📈 +" : "📉 ";
    console.log(`   ${currYear} : ${symbole}${variation}% (par rapport à ${prevYear})`);
}

// Focus sur la répartition par filière pour chaque année
console.log("\n Répartition du taux de réussite par filière :");
Object.keys(data).forEach(annee => {
    console.log(`\n Année ${annee}`);
    console.log(`    Général : ${data[annee].tauxReussite.general}%`);
    console.log(`    Technologique : ${data[annee].tauxReussite.technologique}%`);
    console.log(`    Professionnel : ${data[annee].tauxReussite.professionnel}%`);
});
