/*
Fichier : pokemon_api.js
Portée : Commun à l'ensemble des pages de la SAE

Objectif : Contient les fonctions utilitaires
*/

// Cette fonction génère une couleur avec comme seed un identifiant de Pokémon
// (c'est utile puisque pokemon_data, même après complétion, n'a pas de couleurs distinctes)
function genSeededColor(seed = Math.random()) {
  color = Math.floor(Math.abs(Math.sin(seed) * 16777215));
  color = color.toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }

  return color;
}

// Cette fonction (littéralement) met la 1re lettre d'un mot en majuscule
function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
