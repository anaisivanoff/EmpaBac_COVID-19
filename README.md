# EmpaBAC – Analyse des résultats du baccalauréat avant / pendant / après la COVID‑19

EmpaBAC est un projet d’analyse de données qui étudie l’évolution des résultats du baccalauréat français avant, pendant et après la crise de la COVID‑19.  
L’objectif est de mettre en évidence les tendances sur les taux de réussite et la répartition des mentions en fonction des sessions.

---

## 1. Contexte du projet

Ce projet a été réalisé dans le cadre de la formation Ynov autour d’un sujet data mêlant éducation et crise sanitaire.  
Le travail est organisé autour de trois grandes étapes : scraping des données brutes, nettoyage / structuration en JSON, puis analyse et visualisation des tendances.

---

## 2. Structure du dépôt

Le dépôt est organisé de la façon suivante&nbsp;:

- `impabac/`  
  - `index.html`, `acceuil.html`, `statistique.html`, `documentation.html` : pages web de l’application EmpaBAC.  
  - `css/` : styles (dont `style.css`, `particles.css`).  
  - `js/` : scripts front (`app.js`, `script.js`, `particles.min.js`) pour la logique de l’interface et les visualisations.
- `scraper.js/`  
  - `scraper1.js` … `scraper7.js` : scripts Node.js utilisant Puppeteer pour récupérer les données des différentes sessions et les exporter en JSON.
- `js_nettoyage/`  
  - `nettoyage_donnees.js`, `extraction.js`, `analyses_tendances.js` : scripts de nettoyage, d’extraction des variables pertinentes et de calcul des indicateurs (taux de réussite, mentions…).  
- `data.json/`  
  - `data1.json` … `data7.json` : fichiers JSON contenant les données récupérées pour chaque session.  
- `donnees.json`, `extracted_data.json` : fichiers de données consolidées utilisés par les analyses.  
- `analyses_tendances.js` : version principale du script d’analyse des tendances.  
- `package.json`, `package-lock.json` : dépendances Node.js (dont Puppeteer).

---

## 3. Technologies utilisées

- JavaScript (Node.js) pour le scraping et le traitement des données.  
- Puppeteer pour automatiser la navigation et extraire les résultats depuis les sites sources.  
- JSON pour le stockage intermédiaire et final des données.  
- HTML / CSS / JavaScript côté client pour l’interface EmpaBAC et les visualisations (graphiques interactifs).

---

## 4. Installation et exécution

### 4.1. Prérequis

- Node.js installé (version 18+ recommandée).  
- Accès internet si tu relances le scraping avec Puppeteer.

### 4.2. Installation des dépendances

Dans le dossier du projet :

```bash
npm install
```

Cela installe notamment **Puppeteer**.

### 4.3. Relancer le scraping (optionnel)

Dans `scraper.js/`, chaque fichier `scraperX.js` correspond à une ou plusieurs sessions du bac.  
Pour lancer un scraper particulier (exemple `scraper1.js`) :

```bash
node scraper.js/scraper1.js
```

Les scripts enregistrent les données sous forme de fichiers JSON dans le dossier `data.json/`.

### 4.4. Nettoyage et analyse des données

Les scripts de nettoyage et d’analyse se trouvent dans `js_nettoyage/` et à la racine.

Exemples de commandes :

```bash
# Nettoyage et préparation des données
node js_nettoyage/nettoyage_donnees.js

# Extraction de variables et consolidation
node js_nettoyage/extraction.js

# Calcul des tendances (taux de réussite, mentions, etc.)
node js_nettoyage/analyses_tendances.js
# ou
node analyses_tendances.js
```

Ces scripts lisent les fichiers de `data.json/` / `donnees.json` et produisent des fichiers JSON nettoyés (`extracted_data.json`) utilisés ensuite par l’interface web.

### 4.5. Lancer l’interface EmpaBAC

- npx serve impabac
- ctrl + clic sur le lien 

## 5. Fonctionnalités et analyses

- Calcul des taux de réussite du bac par session.  
- Comparaison des taux avant, pendant et après la période COVID.  
- Répartition des mentions (Très Bien, Bien, Assez Bien, Passable) selon les années.  
- Visualisation des tendances sous forme de graphiques interactifs dans l’interface web.

> Remarque : si certaines données consolidées ne sont pas encore définitives, l’application peut utiliser des JSON intermédiaires. Le code est conçu pour pouvoir être relancé facilement dès que de nouvelles données sont disponibles.

---

## 6. Rôles dans le projet

- Coordination de projet et suivi global.  
- Conception et rédaction des scripts de scraping avec Puppeteer.  
- Participation au nettoyage / structuration des données JSON.  
- Contribution à l’interface et à la mise en avant des analyses statistiques.

---

## 7. Pistes d’amélioration

- Ajout de nouvelles années / séries du bac pour affiner l’analyse.  
- Mise en place de tests automatisés pour les scripts de scraping et de nettoyage.  
- Déploiement en ligne de l’interface (GitHub Pages ou autre hébergeur).  
- Ajout d’analyses statistiques plus avancées (tests de significativité, intervalles de confiance, etc.).