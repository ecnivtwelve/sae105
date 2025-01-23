/*
Fichier : home.js
Portée : Page d'accueil : index.html

Objectif : 
  - Afficher des cartes au hasard sur l'accueil
  - Gestion de la recherche
*/

// Affiche 8 cartes au hasard
function addPokemonToHomeRecent() {
  // On cible l'emplacement et on le vide (pour refresh)
  const domElement = document.getElementById("popular-cards");
  domElement.innerHTML = "";

  // Boucle (8 fois) qui obtient un ID parmi les pokemons
  for (let i = 0; i < 8; i++) {
    const id = Math.floor(Math.random() * (pokemons.length - 1)) + 1;

    // Utilise le template qui remplit automatiquement la carte
    domElement.innerHTML += templatePokemonCard(id, i + 1);
  }
}

// Gère la recherche
const handleSearchInput = () => {
  // Récupère la valeur de la recherche
  const value = searchbar.value.toLowerCase().trim();

  // Vide le contenu du résultat de recherche
  const domElement = document.getElementById("search-results");
  domElement.innerHTML = "";

  // Si vide
  if (!value) {
    domElement.innerHTML = `
      <div class="search-result">
        <span class="search-icon material-symbols-outlined">search</span>
        <div class="search-result-content">
          <p class="search-result-description">Commencez par rechercher</p>
        </div>
      </div>`;
    return;
  }

  // Filtre les données de Pokémons (nom en français et identifiant) pour obtenir les résultats
  const results = pokemons.filter(
    (pokemon) =>
      pokemon.identifier.toLowerCase().includes(value) ||
      pokemon.name["fr"].toLowerCase().includes(value)
  );

  // Si vide
  if (results.length === 0) {
    domElement.innerHTML = `
      <div class="search-result">
        <span class="search-icon material-symbols-outlined">search</span>
        <div class="search-result-content">
          <p class="search-result-description">Aucun résultat</p>
        </div>
      </div>`;
  } else {
    renderSearchResults(results, domElement);
  }
};

// Affiche la liste des résultats
function renderSearchResults(results, domElement) {
  const fragment = document.createDocumentFragment();

  // Se limite à 5 résultats
  results.slice(0, 5).forEach((pokemon) => {
    const index = pokemons.indexOf(pokemon) + 1;

    const resultElement = document.createElement("a");
    resultElement.className = "search-result";
    resultElement.href = `./pokemon.html?id=${index}`;
    resultElement.innerHTML = `
      <div class="search-image">
        <img src="./img/full/${index}.png" alt="${pokemon.identifier}" />
      </div>
      <div class="search-result-content">
        <p class="search-result-title">${uppercaseFirstLetter(
          pokemon.name["fr"]
        )}</p>
        <p class="search-result-description">Chercher dans le Pokédex</p>
      </div>`;
    fragment.appendChild(resultElement);
  });

  domElement.appendChild(fragment);
}

// Attend l'input pour le gérer
searchbar.addEventListener("input", handleSearchInput);
// Appelle la fonction pour afficher les cartes
addPokemonToHomeRecent();
