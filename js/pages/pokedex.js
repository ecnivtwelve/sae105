const urlParams = new URLSearchParams(window.location.search);
const defaultType = urlParams.get("type");

const allElement = document.getElementById("all-cards");
const myElement = document.getElementById("my-cards");

let fullPokedexCache = "";
let currentTypeFilter = "";

function showAllCardsToPokedex() {
  if (fullPokedexCache) {
    allElement.innerHTML = fullPokedexCache;
    return;
  }

  const cardsHTML = pokemons
    .map((pokemon, i) => templatePokemonCard(i, i < 20 ? i + 1 : false))
    .join("");

  allElement.innerHTML = cardsHTML;
  fullPokedexCache = cardsHTML;
}

function showMyCardsToPokedex() {
  const storage = localStorage.getItem("collectedPokemons");
  if (!storage) {
    return;
  }

  const collected = JSON.parse(storage);

  const cardsHTML = Object.keys(collected)
    .map((pokemon) =>
      collected[pokemon].amount > 0 ? templatePokemonCard(pokemon) : ""
    )
    .join("");

  myElement.innerHTML = cardsHTML;

  if (cardsHTML.trim() === "") {
    document.body.classList.add("no-cards");
  }
}

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

// filter types
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
];

const typesDropdown = document.getElementById("types-dropdown");

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

function filterByType(type) {
  // set url params
  const url = new URL(window.location);
  url.searchParams.set("type", type);
  window.history.pushState({}, "", url);

  const results = pokemons.filter((pokemon) => pokemon.type_fr.includes(type));

  const resultsHTML = results
    .map((pokemon, i) =>
      templatePokemonCard(pokemons.indexOf(pokemon), i < 20 ? i + 1 : false)
    )
    .join("");

  // set class selected
  const allItems = document.querySelectorAll(".pokedex-dropdown-item");
  allItems.forEach((item) => item.classList.remove("selected"));
  const selectedItem = document.getElementById(`type-${type}`);
  selectedItem.classList.add("selected");

  // set #type-select-icon and #type-select-text
  const typeSelectIcon = document.getElementById("type-select-icon");
  const typeSelectText = document.getElementById("type-select-text");
  typeSelectIcon.innerHTML = pokemonTypesWithSymbols.find(
    (elem) => elem.type === type
  ).symbol;
  typeSelectText.innerHTML = type;

  // set set
  const typeFilter = document.getElementById("type-filter");
  typeFilter.classList.add("type-filter-active");
  document.body.classList.add("filter-active");

  currentTypeFilter = type;

  allElement.innerHTML = resultsHTML;
}

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

showAllCardsToPokedex();
setTypesToDropdown();
showMyCardsToPokedex();
