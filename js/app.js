/*
Fichier : app.js
Portée : Commun à l'ensemble des pages de la SAE

Objectifs :
  - Styles au scroll
  - Gestion de la recherche
  - Gestion des couleurs dynamiques
  - Création dynamique des dropdown
  - Modal de connexion
*/

const nav = document.querySelector("nav");
const searchbar = document.querySelector("#search") || null;
const results = document.querySelector("#search-results");

/*
----[ STYLES AU SCROLL ]----
*/

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("scroll");
  } else {
    nav.classList.remove("scroll");
  }
});

/*
----[ RECHERCHE ]----
*/

try {
  // Search listener
  searchbar.addEventListener("focus", () => {
    results.classList.add("visible");
  });

  searchbar.addEventListener("blur", () => {
    setTimeout(() => {
      results.classList.remove("visible");
    }, 100);
  });

  searchbar.addEventListener("input", () => {
    document.querySelectorAll(".search-term").forEach((element) => {
      element.innerHTML = searchbar.value;
    });

    if (searchbar.value.length > 0) {
      document.querySelectorAll(".inputed").forEach((element) => {
        element.classList.add("flex");
      });
    } else {
      document.querySelectorAll(".inputed").forEach((element) => {
        element.classList.remove("flex");
      });
    }
  });
} catch (e) {
  console.log(e);
}

/*
----[ COULEUR AU HOVER ]----
*/

function setHomeColor(color) {
  document.documentElement.style.setProperty("--home-color", color);
}

function resetHomeColor() {
  document.documentElement.style.removeProperty("--home-color");
}

/*
----[ GESTION DES FILTRES / DROPDOWN ]----
*/

document.addEventListener("DOMContentLoaded", function () {
  const filterSelects = document.querySelectorAll(".pokedex-filter-select");

  filterSelects.forEach((select) => {
    select.addEventListener("click", function () {
      const dropdown = select.nextElementSibling;
      select.classList.toggle("active");
      dropdown.classList.toggle("active");
    });
  });

  document.addEventListener("click", function (e) {
    filterSelects.forEach((select) => {
      const dropdown = select.nextElementSibling;
      if (!select.contains(e.target) && !dropdown.contains(e.target)) {
        select.classList.remove("active");
        dropdown.classList.remove("active");
      }
    });
  });
});

/*
----[ MODAL DE CONNEXION ]----
*/

function openLoginModal() {
  document.getElementById("login-modal").classList.add("active");
  // focus on the input
  document.getElementById("login-firstname").focus();
  // select the text
  document.getElementById("login-firstname").select();
}

function closeLoginModal() {
  document.getElementById("login-modal").classList.remove("active");
}

function saveModalName() {
  const name = document.getElementById("login-firstname").value;
  localStorage.setItem("name", name);
  document.getElementById("login-modal").classList.remove("active");

  applyName();
}

function applyName() {
  const currentName = localStorage.getItem("name");

  document.querySelectorAll(".hello-name").forEach((element) => {
    element.innerHTML = currentName
      ? "Bonjour, " + currentName + " !"
      : "Bienvenue sur Pokésaé !";
  });

  document.querySelectorAll(".user-name").forEach((element) => {
    element.innerHTML = currentName || "Mon compte";
  });

  document.getElementById("login-firstname").value = currentName || "";
}

try {
  document
    .getElementById("login-firstname")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        saveModalName();
      }
    });
} catch (e) {
  console.log(e);
}

applyName();

// href = "./pokemon.html?id=${finalID}";
function openPokemonCardAnimate(id) {
  const cardItem = document.getElementById(`pokemon-card-${id}`);
  var rect = cardItem.getBoundingClientRect();

  // redirect to the pokemon page
  window.location.href = `./pokemon.html?id=${id}&top=${rect.top}&left=${rect.left}`;
}
