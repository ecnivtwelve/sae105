function addPokemonToHomeRecent() {
  const domElement = document.getElementById("popular-cards");
  domElement.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const id = Math.floor(Math.random() * (pokemons.length - 1)) + 1;
    const pokemon = pokemons[id];

    domElement.innerHTML += templatePokemonCard(id, i + 1);
  }
}

function renderSearchResults(results, domElement) {
  const fragment = document.createDocumentFragment();

  results.slice(0, 5).forEach((pokemon) => {
    const index = pokemons.indexOf(pokemon) + 1;

    const resultElement = document.createElement("a");
    resultElement.className = "search-result";
    resultElement.href = `./pokemon.html?id=${index - 1}`;
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

const handleSearchInput = () => {
  const value = searchbar.value.toLowerCase().trim();
  const domElement = document.getElementById("search-results");
  domElement.innerHTML = "";

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

  const results = pokemons.filter(
    (pokemon) =>
      pokemon.identifier.toLowerCase().includes(value) ||
      pokemon.name["fr"].toLowerCase().includes(value)
  );

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

searchbar.addEventListener("input", handleSearchInput);
addPokemonToHomeRecent();
