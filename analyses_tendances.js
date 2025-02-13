const fs = require('fs');

/* 
 * 📌 Fonction qui calcule la moyenne des taux de réussite
 * 🔹 Elle parcourt les fichiers JSON pour extraire les taux de réussite globaux.
 * 🔹 Elle calcule la moyenne sur toutes les années disponibles.
 */

function calculerMoyenneTauxReussite() {
    let totalTaux = 0;
    let nombreAnnees = 0;
    
    // Liste des fichiers JSON (remplace par les fichiers réels d'Enzo)
    const fichiers = ["data1.json", "data2.json", "data3.json", "data4.json", "data5.json"];

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
                console.log(`📆 Année ${jsonData.extractedAt.split('-')[0]} : ${taux}%`);
                totalTaux += taux;
                nombreAnnees++;
            }
        } catch (err) {
            console.error(`❌ Erreur en lisant ${fichier} : `, err);
        }
    });

    if (nombreAnnees > 0) {
        let moyenne = (totalTaux / nombreAnnees).toFixed(2);
        console.log(`\n📊 Moyenne du taux de réussite sur ${nombreAnnees} années : ${moyenne}%`);
    } else {
        console.log("⚠️ Aucun taux de réussite trouvé dans les fichiers.");
    }
}

// Lancer l'analyse de la moyenne des taux de réussite
calculerMoyenneTauxReussite();

/* 
 * 📌 Fonction qui analyse l’évolution des taux de réussite 
 * 🔹 Compare chaque année avec l'année précédente et affiche la variation.
 */

function calculerEvolutionTauxReussite(tauxParAnnee) {
    console.log("\n📈 Évolution du taux de réussite par rapport à l'année précédente :");
    
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

// ✅  Exemple d'utilisation avec des taux fictifs (remplacera les vraies données)
const tauxDeReussite = {
    "2018": 88.2,
    "2019": 87.4,
    "2020": 95.7,
    "2021": 93.2,
    "2022": 92.1
};

// ✅ Lancer l'analyse d'évolution des taux de réussite 
calculerEvolutionTauxReussite(tauxDeReussite);

/* 
 * 📌 Fonction qui analyse la répartition des mentions obtenues au Bac
 * 🔹 Affiche le nombre d’élèves ayant obtenu chaque mention par année.
 */

function analyserRepartitionMentions(mentionsParAnnee) {
    console.log("\n🏅 Répartition des mentions par année :");

    let annees = Object.keys(mentionsParAnnee);
    annees.forEach(annee => {
        console.log(`\n📆 Année ${annee}`);
        let mentions = mentionsParAnnee[annee];

        Object.keys(mentions).forEach(mention => {
            console.log(`   🏆 ${mention} : ${mentions[mention]} élèves`);
        });
    });
}

// ✅Exemple des mentions fitcives fictives (remplacera les vraies plus tard)
const mentions = {
    "2018": { "Très Bien": 50000, "Bien": 120000, "Assez Bien": 200000, "Passable": 300000 },
    "2019": { "Très Bien": 52000, "Bien": 118000, "Assez Bien": 205000, "Passable": 290000 },
    "2020": { "Très Bien": 70000, "Bien": 150000, "Assez Bien": 220000, "Passable": 250000 },
    "2021": { "Très Bien": 68000, "Bien": 140000, "Assez Bien": 210000, "Passable": 260000 },
    "2022": { "Très Bien": 65000, "Bien": 130000, "Assez Bien": 215000, "Passable": 270000 }
};

// ✅ Lancer l'analyse des mentions
analyserRepartitionMentions(mentions);
