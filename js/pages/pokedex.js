/*
Fichier : pokedex.js
Portée : Page d'accueil : pokedex.html
*/

// Obtient les paramètres GET (pour permettre de donner un type)
const urlParams = new URLSearchParams(window.location.search);
const defaultType = urlParams.get("type");

// Cible les éléments
const allElement = document.getElementById("all-cards");
const myElement = document.getElementById("my-cards");
const typesDropdown = document.getElementById("types-dropdown");

// Types de Pokémon avec des symboles Material
const pokemonTypesWithSymbols = [
  { type: "Normal", symbol: "adjust" },
  { type: "Feu", symbol: "local_fire_department" },
  { type: "Eau", symbol: "water_drop" },
  { type: "Électrique", symbol: "flash_on" },
  { type: "Plante", symbol: "grass" },
  { type: "Glace", symbol: "ac_unit" },
  { type: "Combat", symbol: "fitness_center" },
  { type: "Poison", symbol: "science" },
  { type: "Sol", symbol: "terrain" },
  { type: "Vol", symbol: "air" },
  { type: "Psy", symbol: "psychology" },
  { type: "Insecte", symbol: "bug_report" },
  { type: "Roche", symbol: "landscape" },
  { type: "Spectre", symbol: "dark_mode" },
  { type: "Dragon", symbol: "rocket_launch" },
  { type: "Ténèbres", symbol: "visibility_off" },
  { type: "Acier", symbol: "construction" },
  { type: "Fée", symbol: "auto_awesome" },
  { type: "Spécial", symbol: "hotel_class" },
];

// Cache du pokedex complet rendu pour gagner en performances
let fullPokedexCache = "";
// Filtre en cours (variable globale)
let currentTypeFilter = "";

// Fonction qui affiche toutes les cartes du Pokédex
function showAllCardsToPokedex() {
  if (fullPokedexCache) {
    // Si le cache existe, autant pas trop se casser la tête
    allElement.innerHTML = fullPokedexCache;
    return;
  }

  // Sinon, on génère les cartes
  const cardsHTML = pokemons
    .map((pokemon, i) => templatePokemonCard(i, i < 20 ? i + 1 : false))
    .join("");

  // On les affiche
  allElement.innerHTML = cardsHTML;

  // On met en cache
  fullPokedexCache = cardsHTML;
}

// Affichage de la collection
function showMyCardsToPokedex() {
  // Utilisation du LocalStorage pour la persistance
  const storage = localStorage.getItem("collectedPokemons");

  // Si vide, on ne fait rien
  if (!storage) {
    document.body.classList.add("no-cards");
    return;
  }

  // Parsing du JSON
  const collected = JSON.parse(storage);

  // Boucle sur les cartes
  const cardsHTML = Object.keys(collected)
    .map((pokemon) =>
      collected[pokemon].amount > 0 ? templatePokemonCard(pokemon) : ""
    )
    .join("");

  // Affichage
  myElement.innerHTML = cardsHTML;

  // Cache des élements CSS si vide
  if (cardsHTML.trim() === "") {
    document.body.classList.add("no-cards");
  }
}

// Gestion de la recherche du Pokédex
searchbar.addEventListener("input", () => {
  const value = searchbar.value.toLowerCase().trim();

  if (value === "") {
    showAllCardsToPokedex();
    document.body.classList.remove("filter-active");
    return;
  }

  document.body.classList.add("filter-active");

  const finalPokemons = currentTypeFilter
    ? pokemons.filter((pokemon) => pokemon.type_fr.includes(currentTypeFilter))
    : pokemons;

  const results = finalPokemons.filter(
    (pokemon) =>
      pokemon.identifier.toLowerCase().includes(value) ||
      pokemon.name["fr"].toLowerCase().includes(value)
  );

  const resultsHTML = results
    .map((pokemon, i) =>
      templatePokemonCard(pokemons.indexOf(pokemon), i < 20 ? i + 1 : false)
    )
    .join("");

  allElement.innerHTML = resultsHTML;
});

// Génération du dropdown pour le filtre par type
function setTypesToDropdown() {
  typesDropdown.innerHTML = ``;

  pokemonTypesWithSymbols.forEach((type) => {
    const newElem = `
    <a href="#" class="pokedex-dropdown-item" onclick="filterByType('${type.type}')" id="type-${type.type}">
      <span class="item-icon material-symbols-outlined">${type.symbol}</span>
      <p class="item-text">${type.type}</p>
    </a>
  `;

    typesDropdown.innerHTML += newElem;
  });

  if (defaultType) {
    filterByType(defaultType);
  }
}

// Filtrage par type au clic
function filterByType(type) {
  // Ajoute un paramètre pour conserver le filtre dans l'historique et l'URL
  const url = new URL(window.location);
  url.searchParams.set("type", type);
  window.history.pushState({}, "", url);

  // Filtre les résultats
  const results = pokemons.filter((pokemon) => pokemon.type_fr.includes(type));

  // Génère les cartes
  const resultsHTML = results
    .map((pokemon, i) =>
      templatePokemonCard(pokemons.indexOf(pokemon), i < 20 ? i + 1 : false)
    )
    .join("");

  // Met comme sélectionné
  const allItems = document.querySelectorAll(".pokedex-dropdown-item");
  allItems.forEach((item) => item.classList.remove("selected"));
  const selectedItem = document.getElementById(`type-${type}`);
  selectedItem.classList.add("selected");

  // Change l'icone et le texte actuel
  const typeSelectIcon = document.getElementById("type-select-icon");
  const typeSelectText = document.getElementById("type-select-text");
  typeSelectIcon.innerHTML = pokemonTypesWithSymbols.find(
    (elem) => elem.type === type
  ).symbol;
  typeSelectText.innerHTML = type;

  // Gestion CSS
  const typeFilter = document.getElementById("type-filter");
  typeFilter.classList.add("type-filter-active");
  document.body.classList.add("filter-active");

  currentTypeFilter = type;

  allElement.innerHTML = resultsHTML;
}

// Réinitialisation du filtre
function resetFilter(filter) {
  switch (filter) {
    case "type":
      const allItems = document.querySelectorAll(".pokedex-dropdown-item");
      allItems.forEach((item) => item.classList.remove("selected"));

      const typeSelectIcon = document.getElementById("type-select-icon");
      const typeSelectText = document.getElementById("type-select-text");
      typeSelectIcon.innerHTML = "filter_list";
      typeSelectText.innerHTML = "Type";

      const typeFilter = document.getElementById("type-filter");
      typeFilter.classList.remove("type-filter-active");
      document.body.classList.remove("filter-active");

      const url = new URL(window.location);
      url.searchParams.delete("type");
      window.history.pushState({}, "", url);

      currentTypeFilter = "";

      showAllCardsToPokedex();
      break;
  }
}

// Initialisation
showAllCardsToPokedex();
setTypesToDropdown();
showMyCardsToPokedex();
