const fs = require('fs');

// Charger les fichiers JSON (remplace les noms des fichiers par ceux d'Enzo si besoin)
const fichiers = ["data1.json", "data2.json", "data3.json", "data4.json", "data5.json", "data6.json", "data7.json"];

// Fonction pour calculer la moyenne des taux de réussite
function calculerMoyenneTauxReussite() {
    let totalTaux = 0;
    let nombreAnnees = 0;
    
    fichiers.forEach(fichier => {
        try {
            // Lire le fichier JSON
            let data = fs.readFileSync(fichier, 'utf8');
            let jsonData = JSON.parse(data);
            
            // Extraire le taux de réussite global
            let texte = jsonData.extractedText;
            let match = texte.match(/(\d{1,2},\d)%/);
            
            if (match) {
                let taux = parseFloat(match[1].replace(',', '.'));
                console.log(`Année ${jsonData.extractedAt.split('-')[0]} : ${taux}%`);
                totalTaux += taux;
                nombreAnnees++;
            }
        } catch (err) {
            console.error(`Erreur en lisant ${fichier} : `, err);
        }
    });

    if (nombreAnnees > 0) {
        let moyenne = (totalTaux / nombreAnnees).toFixed(2);
        console.log(`✅ Moyenne du taux de réussite sur ${nombreAnnees} années : ${moyenne}%`);
    } else {
        console.log("Aucun taux de réussite trouvé dans les fichiers.");
    }
}

// Lancer l'analyse
calculerMoyenneTauxReussite();

function calculerEvolutionTauxReussite(tauxParAnnee) {
    console.log("\n📊 Évolution du taux de réussite par rapport à l'année précédente :");
    
    let annees = Object.keys(tauxParAnnee);
    for (let i = 1; i < annees.length; i++) {
        let anneePrecedente = annees[i - 1];
        let anneeActuelle = annees[i];

        let tauxPrecedent = tauxParAnnee[anneePrecedente];
        let tauxActuel = tauxParAnnee[anneeActuelle];

        let variation = (tauxActuel - tauxPrecedent).toFixed(2);
        let symbole = variation >= 0 ? "📈 +" : "📉 ";

        console.log(`${anneeActuelle} : ${symbole}${variation}% (par rapport à ${anneePrecedente})`);
    }
}

// Exemple d'utilisation avec des taux fictifs (remplacera les vraies données)
const tauxDeReussite = {
    "2018": 88.2,
    "2019": 87.4,
    "2020": 95.7,
    "2021": 93.2,
    "2022": 92.1
};

// Lancer l'analyse d'évolution
calculerEvolutionTauxReussite(tauxDeReussite);
