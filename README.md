# SAÉ 1.05 🕹️

_Produire un site web — Projet Pokémon_

> Vince LINISE - 1A1

## 🎨 Intentions graphiques

Conformémént à la maquette, au wireframe et à la planche univers, le but était de conserver une interface minimaliste et épurée dans le style de Nintendo.

De cette manière, l'ensemble de l'interface se veut claire en terme de structure et de fonctionnalités, **limitant les fonctionnalités** ou éléments graphiques peu utiles par rapport à la consigne.

## 💻 Intentions techniques

### 📜 Le JavaScript

Pour correspondre à la limitation du sujet demandant d'utiliser aucun framework, toutes les fonctionnalités dynamiques de l'interface ont été construites manuellement dans différents fichiers JS (tels que `app.js` ou `templates.js`)

> J'ai fait le choix de faire un fichier `templates.js` distinct afin de ne pas avoir a recopier les bases HTML à travers différents fichiers (notamment sur les cartes Pokémon)

> Les fonctionnalités particulières _(la modale de connexion par exemple)_ fonctionnent sur des fichiers JS importés sur l'ensemble des pages

### 🎨 Les styles

Le CSS a également été divisé en de nombreux fichiers individuels (qui viennent s'importer si nécessaire pour éviter de décharger cela en HTML) qui permettent une modularité des styles importés à travers les différentes pages.

#### 🛠️ Les variables

Afin d'appliquer des styles sur l'ensemble de la pages, le JavaScript est utilisé pour attribuer des variables aux pages correspondantes (ex: cartes de couleur différentes)

#### 🔄 Transitions entre les pages

Pour les animations complèxes et transitions _(page de carte)_, le JS et les paramètres GET sont utilisés pour déplacer les éléments de manières fluides

Les animations sont uniquement gérées en CSS et non en JavaScript pour ne pas utiliser de framework

### 📊 Population et chargement des données

Sur la page de détail du Pokémon, le contenu est chargé depuis le JS puis rempli dans les emplacements plutôt qu'utiliser un template complet.

Pour la collection, un stockage persistant en JSON (avec LocalStorage) est utilisé afin de conserver les cartes et d'autres données (telle que le prénom) est stockée en local.

### 📂 Jeu de données

Afin de compléter les informations disponibles, le jeu de données à été étendu avec un script que j'ai écrit et publié sur GitHub : https://github.com/ecnivtwelve/sae105-api-data

> Celui ci utilise PokéAPI (https://pokeapi.co/) et Tyradex (https://tyradex.vercel.app/) pour obtenir des données supplémentaires
