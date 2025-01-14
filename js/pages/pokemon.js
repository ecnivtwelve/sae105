const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

let pokemon = pokemons[pokemonId];
let pokemonColor = genSeededColor(pokemonId);

// set --pokemon-color css variable
document.documentElement.style.setProperty(
  "--pokemon-color",
  "#" + pokemonColor
);

const setCardToPlaceholder = () => {
  const card = document.getElementById("pokemon-card");
  card.innerHTML = templatePokemonCard(pokemonId);
};

const placeImages = () => {
  // replace .pokemon-image src
  const images = document.querySelectorAll(".pokemon-image");

  images.forEach((image) => {
    image.src = `./img/full/${parseInt(pokemonId) + 1}.png`;
    image.alt = pokemon.name["fr"] ?? pokemon.identifier;
  });
};

document.getElementById("pokemon-name").innerText =
  pokemon.name["fr"] ?? pokemon.identifier;

document.getElementById("pokemon-description").innerText = `
  ${pokemon.name["fr"]} est un Pokémon de type ${pokemon.type_fr[0]} avec une expérience de base de ${pokemon.base_experience} points. Il se nomme ${pokemon.name["jp"]} en japonais et possède ${pokemon.stats.hp} points de vie.
`.trim();

function checkIfCollected() {
  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};
  if (collectedPokemons[pokemonId] && collectedPokemons[pokemonId].amount > 0) {
    document.getElementById("collect-btns").classList.add("added");
    document.getElementById("collection-count").innerText =
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

function collectPokemon() {
  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};
  if (!collectedPokemons[pokemonId]) {
    collectedPokemons[pokemonId] = { amount: 0 };
  }
  collectedPokemons[pokemonId].amount += 1;
  localStorage.setItem("collectedPokemons", JSON.stringify(collectedPokemons));
  checkIfCollected();
}

function removePokemon() {
  let collectedPokemons =
    JSON.parse(localStorage.getItem("collectedPokemons")) || {};
  if (collectedPokemons[pokemonId].amount > 0) {
    collectedPokemons[pokemonId].amount -= 1;
  }
  localStorage.setItem("collectedPokemons", JSON.stringify(collectedPokemons));
  checkIfCollected();
}

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
    <a href="pokemon.html?id=${evolution}" class="stat evolution">
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
    <a href="pokemon.html?id=${evolution}" class="stat evolution">
              <img class="evolution-image" src="./img/full/${
                evolution + 1
              }.png" />
              <p class="evolution-name">${nom}</p>
            </a>
    `;
  });

  document.getElementById("poke-evolutions").innerHTML = newEvolutions;
}

function showRelatedPokemons() {
  const domElement = document.getElementById("related-cards");
  domElement.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const id = Math.floor(Math.random() * (pokemons.length - 1)) + 1;
    const pokemon = pokemons[id];

    domElement.innerHTML += templatePokemonCard(id, i + 1);
  }
}

setCardToPlaceholder();
placeImages();
checkIfCollected();
showStats();
showEvolutions();
showRelatedPokemons();
