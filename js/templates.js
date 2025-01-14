const pokemons = Object.values(pokemonData);

function templatePokemonCard(id, animationIndex) {
  const pokemon = pokemons[id];

  if (!pokemon) {
    return "";
  }

  return `
       <a
        class="pokemon-card ${animationIndex !== false ? "animated" : ""}"
        style="
          --color: #${genSeededColor(id)};
          --index:${animationIndex};
        "
        href="./pokemon.html?id=${id}"
        onmouseenter="setHomeColor('#${genSeededColor(id)}')"
        onmouseleave="resetHomeColor()"
        >
        <div class="pokemon-card-header">
          <div class="pokemon-card-header-title">
            <p class="pokemon-card-num">${id}</p>
            <p class="pokemon-card-name">${
              pokemon.name["fr"] ?? pokemon.identifier
            }</p>
            <p class="pokemon-card-pv">
              <span class="pv-text">PV</span><span>${pokemon.stats["hp"]}</span>
            </p>
          </div>
          <img
            class="pokemon-card-image"
            src="./img/full/${parseInt(id) + 1}.png"
            alt="${pokemon.name["fr"] ?? pokemon.identifier}"
          />
        </div>
        <div class="pokemon-card-stats">
          <div class="pokemon-card-stat">
            <span class="pokemon-card-stat-icon material-symbols-outlined"
              >destruction</span
            >
            <div class="pokemon-card-stat-content">
              <p class="pokemon-card-stat-title">Attaque</p>
              <p class="pokemon-card-stat-description">Points d'attaque</p>
            </div>
            <p class="pokemon-card-stat-value">${pokemon.stats.attack}</p>
          </div>
          <div class="pokemon-card-stat">
            <span class="pokemon-card-stat-icon material-symbols-outlined"
              >swords</span
            >
            <div class="pokemon-card-stat-content">
              <p class="pokemon-card-stat-title">Défense</p>
              <p class="pokemon-card-stat-description">Points de défense</p>
            </div>
            <p class="pokemon-card-stat-value">${pokemon.stats.defense}</p>
          </div>
          <div class="pokemon-card-stat">
            <span class="pokemon-card-stat-icon material-symbols-outlined"
              >star</span
            >
            <div class="pokemon-card-stat-content">
              <p class="pokemon-card-stat-title">Expérience de base</p>
              <p class="pokemon-card-stat-description">XP de base du Pokémon</p>
            </div>
            <p class="pokemon-card-stat-value">${pokemon.base_experience}</p>
          </div>
        </div>
      </a>
    `;
}

function templateStat(icon, title, value) {
  let fillValue = value;

  if (value > 100) {
    fillValue = 100;
  }

  if (value < 20) {
    fillValue = 20;
  }

  return `
    <div class="stat">
              <span class="stat-icon material-symbols-outlined">${icon}</span>
              <p class="stat-title">${title}</p>
              <div class="progress" style="--completion: ${fillValue}%">
                <div class="completion">
                  <p class="value">${value}%</p>
                </div>
              </div>
            </div>
  `;
}
