// Elements selector
const nav = document.querySelector("nav");
const searchbar = document.querySelector("#search") || null;
const results = document.querySelector("#search-results");

// Scroll listener
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("scroll");
  } else {
    nav.classList.remove("scroll");
  }
});

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
    // replace all .search-term with the value of the input
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

function setHomeColor(color) {
  document.documentElement.style.setProperty("--home-color", color);
}

function resetHomeColor() {
  document.documentElement.style.removeProperty("--home-color");
}

document.addEventListener("DOMContentLoaded", function () {
  // Select all filter select elements
  const filterSelects = document.querySelectorAll(".pokedex-filter-select");

  filterSelects.forEach((select) => {
    select.addEventListener("click", function () {
      // Toggle active class on both select and dropdown
      const dropdown = select.nextElementSibling;
      select.classList.toggle("active");
      dropdown.classList.toggle("active");
    });
  });

  // Close dropdown when clicking outside
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

  // set all .hello-name text to the current name
  document.querySelectorAll(".hello-name").forEach((element) => {
    element.innerHTML = "Bonjour, " + currentName + " !" || "Bonjour !";
  });

  document.querySelectorAll(".user-name").forEach((element) => {
    element.innerHTML = currentName || "Mon compte";
  });

  // set input value to the current name
  document.getElementById("login-firstname").value = currentName || "";
}

// on enter key press
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
