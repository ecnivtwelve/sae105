function getPokemonById(domElementId, id, pokemonData) {
  // TODO
}

function getPokemonByName(domElementId, name, pokemonData) {
  // TODO
}

function genSeededColor(seed = Math.random()) {
  color = Math.floor(Math.abs(Math.sin(seed) * 16777215));
  color = color.toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }

  return color;
}

function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function listAllPokemon(domElementId, pokemonData) {
  const domElement = document.getElementById(domElementId);
  domElement.innerHTML = Object.values(pokemonData)
    .map(
      (pokemon) => `
        <div>
            <p>${pokemon.identifier}</p>
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Base Experience: ${pokemon.base_experience}</p>
        </div>
    `
    )
    .join("");
}

function createPokemonDropdown(domElementId, pokemonData) {
  const domElement = document.getElementById(domElementId);

  const selectElement = document.createElement("select");
  selectElement.id = "pokemonDropdown";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Sélectionner un pokemon";
  selectElement.appendChild(defaultOption);

  Object.values(pokemonData).forEach((pokemon) => {
    const option = document.createElement("option");
    option.value = pokemon.identifier;
    option.textContent =
      pokemon.identifier.charAt(0).toUpperCase() + pokemon.identifier.slice(1); // Capitalise le premier caractère (oui ca ne sert a rien)
    selectElement.appendChild(option);
  });

  domElement.appendChild(selectElement);
}

function listAllPokemonFromCollection(
  domElementId,
  collectionData,
  pokemonData
) {
  const domElement = document.getElementById(domElementId);
  const pokemons = collectionData.map((assoc) => {
    const pokemon = pokemonData[assoc.pokemon_id];
    return {
      ...pokemon,
      pokemon_nickname: assoc.pokemon_nickname,
    };
  });
  domElement.innerHTML = pokemons
    .map(
      (pokemon) => `
        <div>
            <p>${pokemon.identifier}</p>
            <p>Nickname: ${pokemon.pokemon_nickname}</p>
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Base Experience: ${pokemon.base_experience}</p>
        </div>
    `
    )
    .join("");
}

function addPokemonToCollection(domElementId, pokemonId, pokemonData) {
  const domElement = document.getElementById(domElementId);

  const pokemon = pokemonData[pokemonId];

  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  // Peut être des choses à ajouter par ici
  pokemonElement.innerHTML = `
        <p>Pokemon: ${pokemon.identifier}</p>
        <p>Surnom: -----</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Base Experience: ${pokemon.base_experience}</p>
        
    `;

  domElement.appendChild(pokemonElement);
}

function deletePokemonFromCollection(domElementId) {
  const pokemonElement = document.getElementById(domElementId);

  if (pokemonElement) {
    pokemonElement.remove();
  }
}

function changePokemonNickname(domElementId, newNickname) {
  const domElement = document.getElementById(domElementId);
  domElement.innerHTML = `<p>Surnom du pokemon modifié en ${newNickname}</p>`;
}
