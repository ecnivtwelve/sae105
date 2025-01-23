/*
Fichier : pokemon.js
Portée : Page d'accueil : pokemon.html
*/

// Obtient l'ID du pokemon dans l'URL (paramètres GET)
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id") ? parseInt(urlParams.get("id")) - 1 : -1;

const cardLeft = urlParams.get("left");
const cardTop = urlParams.get("top");

if (cardLeft && cardTop) {
  document.body.classList.add("transitionCard");
  document.documentElement.style.setProperty("--card-left", cardLeft + "px");
  document.documentElement.style.setProperty("--card-top", cardTop + "px");

  // remove url params left and top
  const url = new URL(window.location);
  url.searchParams.delete("left");
  url.searchParams.delete("top");
  window.history.replaceState({}, "", url);
}

if (!urlParams.get("id")) {
  document.body.classList.add("error");
}

// Obtient le pokemon depuis les données via l'ID en GET
let pokemon = pokemons[pokemonId];

if (!pokemon) {
  document.body.classList.add("error");
}

// Obtient la couleur du pokemon via l'ID en GET puis l'applique en variable CSS
let pokemonColor = genSeededColor(pokemonId);
document.documentElement.style.setProperty(
  "--pokemon-color",
  "#" + pokemonColor
);

// Affiche la carte du pokemon
const setCardToPlaceholder = () => {
  const card = document.getElementById("pokemon-card");
  card.innerHTML = templatePokemonCard(pokemonId, false);
};

// Place des images de pokemon via l'ID en GET (pour le fond animé)
const placeImages = () => {
  // replace .pokemon-image src
  const images = document.querySelectorAll(".pokemon-image");

  images.forEach((image) => {
    image.src = `./img/full/${parseInt(pokemonId) + 1}.png`;
    image.alt = pokemon.name["fr"] ?? pokemon.identifier;
  });
};

// Affiche le nom
document.getElementById("pokemon-name").innerText =
  pokemon.name["fr"] ?? pokemon.identifier;

document.querySelectorAll(".show-poke-type").forEach((element) => {
  element.innerText = pokemonTypesWithSymbols.find(
    (type) => type.type === pokemon.type_fr[0]
  ).symbol;
});

// Gère les types
document.getElementById("pokemon-types").innerText =
  pokemon.type_fr.join(" et ");

document.documentElement.style.setProperty(
  "--type-color",
  pokemon.type_color[0]
);

document.documentElement.style.setProperty(
  "--type-color-light",
  pokemon.type_color[0] + "33"
);

// Affichge la description
document.getElementById("pokemon-description").innerText = `
  ${pokemon.name["fr"]} est un Pokémon de type ${pokemon.type_fr.join(
  " et "
)} avec une expérience de base de ${
  pokemon.base_experience
} points. Il se nomme ${pokemon.name["jp"]} en japonais et possède ${
  pokemon.stats.hp
} points de vie.
`.trim();

// Vérifie si le Pokémon est collecté
function checkIfCollected() {
  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};
  if (collectedPokemons[pokemonId] && collectedPokemons[pokemonId].amount > 0) {
    document.getElementById("collect-btns").classList.add("added");
    document.getElementById("collection-count").value =
      collectedPokemons[pokemonId].amount;

    if (collectedPokemons[pokemonId].amount === 1) {
      document.getElementById("collect-btns").classList.add("last");
    } else {
      document.getElementById("collect-btns").classList.remove("last");
    }
  } else {
    document.getElementById("collect-btns").classList.remove("added");
    document.getElementById("collect-btns").classList.remove("last");
  }
}

document.getElementById("collection-count").addEventListener("input", (e) => {
  const value = parseInt(e.target.value);

  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};

  if (value <= 0) {
    collectedPokemons[pokemonId].amount = 0;
  } else if (value < 99) {
    collectedPokemons[pokemonId].amount = value;
  } else {
    e.target.value == 99;
    collectedPokemons[pokemonId].amount = 99;
  }

  if (isNaN(value)) {
    collectedPokemons[pokemonId].amount = 0;
  }

  localStorage.setItem("collectedPokemons", JSON.stringify(collectedPokemons));
});

document.getElementById("collection-count").addEventListener("click", (e) => {
  e.target.select();
});

document.getElementById("collection-count").addEventListener("blur", (e) => {
  checkIfCollected();
});

// Ajoût du Pokémon à la collection
function collectPokemon() {
  // Obtient les données de la collection depuis le localStorage
  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};
  if (!collectedPokemons[pokemonId]) {
    collectedPokemons[pokemonId] = { amount: 0 };
  }
  if (collectedPokemons[pokemonId].amount < 99) {
    collectedPokemons[pokemonId].amount += 1;
  }
  localStorage.setItem("collectedPokemons", JSON.stringify(collectedPokemons));
  checkIfCollected();
}

// Supprime le Pokémon de la collection
function removePokemon() {
  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};
  if (collectedPokemons[pokemonId].amount > 0) {
    collectedPokemons[pokemonId].amount -= 1;
  }
  localStorage.setItem("collectedPokemons", JSON.stringify(collectedPokemons));
  checkIfCollected();
}

// Affiche les statistiques depuis le template
function showStats() {
  let newStats = "";

  newStats += templateStat("destruction", "Attaque", pokemon.stats.attack);
  newStats += templateStat("swords", "Défense", pokemon.stats.defense);
  newStats += templateStat(
    "hotel_class",
    "Attaque spé.",
    pokemon.stats.special_attack
  );
  newStats += templateStat(
    "rocket",
    "Défense spé.",
    pokemon.stats.special_defense
  );

  document.getElementById("poke-stats").innerHTML = newStats;
}

// Affiche les évolutions avec une boucle
function showEvolutions() {
  let newEvolutions = "";

  pokemon.evolutions_pre = pokemon.evolutions_pre.filter((evId) => evId < 199);
  pokemon.evolutions_next = pokemon.evolutions_next.filter(
    (evId) => evId < 199
  );

  if (
    pokemon.evolutions_pre.length === 0 &&
    pokemon.evolutions_next.length === 0
  ) {
    newEvolutions = `
    <a href="#" class="stat evolution">
    <p class="no-evolution">Ce Pokémon n'a pas d'évolution.</p>
    </a>
    `;
    document.getElementById("poke-evolutions").innerHTML = newEvolutions;
    return;
  }

  pokemon.evolutions_pre.forEach((evId) => {
    const evolution = evId - 1;
    const nom =
      pokemons[evolution].name["fr"] ?? pokemons[evolution].identifier;

    newEvolutions += `
    <a href="pokemon.html?id=${evolution + 1}" class="stat evolution">
              <img class="evolution-image" src="./img/full/${
                evolution + 1
              }.png" />
              <p class="evolution-name">${nom}</p>
            </a>
    `;
  });

  pokemon.evolutions_next.forEach((evId) => {
    const evolution = evId - 1;
    const nom =
      pokemons[evolution].name["fr"] ?? pokemons[evolution].identifier;

    newEvolutions += `
    <a href="pokemon.html?id=${evolution + 1}" class="stat evolution">
              <img class="evolution-image" src="./img/full/${
                evolution + 1
              }.png" />
              <p class="evolution-name">${nom}</p>
            </a>
    `;
  });

  document.getElementById("poke-evolutions").innerHTML = newEvolutions;
}

// Affiche 4 pokémons aléatoires (comme sur home.js)
function showRelatedPokemons() {
  const domElement = document.getElementById("related-cards");
  domElement.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const id = Math.floor(Math.random() * (pokemons.length - 1)) + 1;
    const pokemon = pokemons[id];

    domElement.innerHTML += templatePokemonCard(id, i + 1);
  }
}

// Appel des fonctions

setCardToPlaceholder();
placeImages();
checkIfCollected();
showStats();
showEvolutions();
showRelatedPokemons();
