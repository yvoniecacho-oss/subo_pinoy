// Subo Pinoy consolidated application script
(function(){
  // Navigation between the four retained pages (no separate info/login pages).
  const views=[...document.querySelectorAll('.page-view')];
  const links=[...document.querySelectorAll('[data-page-link]')];
  function showPage(name){
    if(!views.some(v=>v.dataset.page===name)) name='home';
    views.forEach(v=>v.hidden=v.dataset.page!==name);
    links.forEach(a=>a.classList.toggle('active',a.dataset.pageLink===name));
    history.replaceState(null,'','#'+name);
    window.scrollTo(0,0);
  }
  links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showPage(a.dataset.pageLink)}));
  const initial=location.hash.slice(1); showPage(initial||'home');
  window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)));

  // Home page interactions
  const fav=document.getElementById('favBtn');
  if(fav) fav.addEventListener('click',()=>{fav.classList.toggle('is-favorite');fav.textContent=fav.classList.contains('is-favorite')?'♥':'♡';});
  const recipeSearch=document.getElementById('recipeSearch');
  if(recipeSearch) recipeSearch.addEventListener('keydown',e=>{if(e.key==='Enter'){showPage('search');const input=document.getElementById('search-input');if(input){input.value=recipeSearch.value;input.dispatchEvent(new Event('input'));}}});

  // Search page functionality
  if(document.getElementById("search-input")){
  (function(){
const dishes = [
  {
    name: "Chicken Adobo",
    category: "Chicken",
    difficulty: "Easy",
    time: "45 minutes",
    minutes: 45,
    image: "assets/search/chicken.png",
    link: "#"
  },
  {
    name: "Pork Adobo",
    category: "Pork",
    difficulty: "Easy",
    time: "1 Hour",
    minutes: 60,
    image: "assets/search/pork.png",
    link: "#"
  },
  {
    name: "Adobong Pusit",
    category: "Seafood",
    difficulty: "Medium",
    time: "40 minutes",
    minutes: 40,
    image: "assets/search/pusit.png",
    link: "#"
  },
  {
    name: "Adobong Kangkong",
    category: "Vegetable",
    difficulty: "Easy",
    time: "15 minutes",
    minutes: 15,
    image: "assets/search/kangkong.png",
    link: "#"
  },
  {
    name: "Adobo Flakes",
    category: "Chicken",
    difficulty: "Easy",
    time: "30 minutes",
    minutes: 30,
    image: "assets/search/flakes.png",
    link: "#"
  }
];

const searchInput = document.getElementById("search-input");
const clearBtn = document.getElementById("clear-btn");
const filterPills = document.querySelectorAll(".pill");
const resultsMeta = document.getElementById("results-meta");
const resultsCount = document.getElementById("results-count");
const sortBtn = document.getElementById("sort-btn");
const resultsList = document.getElementById("results-list");

let activeCategory = "All";
let sortByQuickest = false;

function updateSearchResults() {
  const query = searchInput.value.trim().toLowerCase();

  resultsList.innerHTML = "";

  let matches = dishes.filter(function (dish) {
    const matchesText = dish.name.toLowerCase().includes(query);
    const matchesCategory =
      activeCategory === "All" ||
      dish.category.toLowerCase() === activeCategory.toLowerCase() ||
      dish.difficulty.toLowerCase() === activeCategory.toLowerCase();

    return matchesText && matchesCategory;
  });

  if (sortByQuickest) {
    matches = matches.slice().sort(function (a, b) {
      return a.minutes - b.minutes;
    });
  }

  resultsMeta.style.display = "flex";
  if (query !== "") {
    resultsCount.textContent = `${matches.length} results for "${searchInput.value.trim()}"`;
  } else if (activeCategory === "All") {
    resultsCount.textContent = `${matches.length} results`;
  } else {
    resultsCount.textContent = `${matches.length} results in ${activeCategory}`;
  }

  matches.forEach(function (dish) {
    const card = document.createElement("li");
    card.className = "recipe-card";

    const highlightedName = highlightMatch(dish.name, query);

    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" class="recipe-thumb" />
      <div class="recipe-info">
        <h3 class="recipe-title">${highlightedName}</h3>
        <div class="recipe-tags">
          <span class="tag-category">${dish.category}</span>
          <span class="tag-difficulty">${dish.difficulty}</span>
        </div>
        <p class="recipe-time">${dish.time}</p>
      </div>
      <a href="${dish.link}" class="arrow-btn" aria-label="View ${dish.name}">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;

    resultsList.appendChild(card);
  });
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

searchInput.addEventListener("input", updateSearchResults);

clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  updateSearchResults();
  searchInput.focus();
});

sortBtn.addEventListener("click", function () {
  sortByQuickest = !sortByQuickest;
  sortBtn.textContent = sortByQuickest ? "Quickest ↑" : "Best Match ↓";
  updateSearchResults();
});

filterPills.forEach(function (pill) {
  pill.addEventListener("click", function () {
    filterPills.forEach(function (p) {
      p.classList.remove("active");
    });
    pill.classList.add("active");
    activeCategory = pill.dataset.filter;
    updateSearchResults();
  });
});

updateSearchResults();
  })();
  }

  // Profile data store and profile interactions
const SuboUser = (function () {
  const STORAGE_KEY = "subo_pinoy_user_v1";

  const defaultData = {
    username: "YoMaMa_15",
    email: "yomama15@wvsu.edu.ph",
    avatar: "assets/profile/subopfp.jpg",
    settings: {
      notifications: true,
      darkMode: false,
      metricUnits: true,
      autoSaveHistory: true,
      publicProfile: true
    },
    favorites: [
      { name: "Chicken Adobo", category: "Chicken", difficulty: "Easy", time: "45 minutes", image: "assets/search/chicken.png", link: "#" },
      { name: "Pork Adobo", category: "Pork", difficulty: "Easy", time: "1 Hour", image: "assets/search/pork.png", link: "#" },
      { name: "Adobong Pusit", category: "Seafood", difficulty: "Medium", time: "40 minutes", image: "assets/search/pusit.png", link: "#" }
    ],
    activity: [
      "Searched for 'Adobo' • 04:12 PM",
      "Viewed Chicken Adobo recipe • 04:15 PM",
      "Saved Pork Adobo to Favorites • 04:20 PM"
    ]
  };

  function getUser() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(defaultData);
  }

  function saveUser(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function updateAccount(updates) {
    const user = getUser();
    Object.assign(user, updates);
    saveUser(user);
    logActivity("Updated account details");
    return user;
  }

  function toggleSetting(key) {
    const user = getUser();
    user.settings[key] = !user.settings[key];
    saveUser(user);
    return user.settings[key];
  }

  function addFavorite(dish) {
    const user = getUser();
    if (!user.favorites.some((item) => item.name === dish.name)) {
      user.favorites.unshift(dish);
      saveUser(user);
      logActivity(`Added ${dish.name} to Favorites`);
    }
  }

  function removeFavorite(dishName) {
    const user = getUser();
    user.favorites = user.favorites.filter((item) => item.name !== dishName);
    saveUser(user);
    logActivity(`Removed ${dishName} from Favorites`);
  }

  function logActivity(actionText) {
    const user = getUser();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    user.activity.unshift(`${actionText} • ${time}`);
    user.activity = user.activity.slice(0, 15);
    saveUser(user);
  }

  function logout(redirectUrl = "../Searchpage/search_page.html") {
    logActivity("Logged out");
    window.location.href = redirectUrl;
  }

  return {
    getUser,
    updateAccount,
    toggleSetting,
    addFavorite,
    removeFavorite,
    logActivity,
    logout
  };
})();
  if(document.getElementById("view-menu")){
  (function(){
const menuView = document.getElementById("view-menu");
const subPanel = document.getElementById("sub-panel");
const panelHeading = document.getElementById("panel-heading");
const panelBody = document.getElementById("panel-body");
const actionRowButtons = document.querySelectorAll(".action-row-card");
const btnBack = document.getElementById("btn-back");
const btnLogout = document.getElementById("btn-logout");

let currentActiveView = "menu"; // 'menu' or panel type ('favorites', 'settings', 'edit', 'activity')

function renderProfileHeader() {
  const user = SuboUser.getUser();
  document.getElementById("profile-username").textContent = user.username;
  document.getElementById("profile-avatar").src = user.avatar;
}

function showMenu() {
  currentActiveView = "menu";
  menuView.classList.remove("hidden");
  subPanel.classList.add("hidden");
}

function showSubPanel(viewType) {
  currentActiveView = viewType;
  menuView.classList.add("hidden");
  subPanel.classList.remove("hidden");

  if (viewType === "favorites") {
    panelHeading.textContent = "FAVORITES";
    renderFavoritesPanel();
  } else if (viewType === "settings") {
    panelHeading.textContent = "ACCOUNT SETTINGS";
    renderSettingsPanel();
  } else if (viewType === "edit") {
    panelHeading.textContent = "EDIT ACCOUNT";
    renderEditPanel();
  } else if (viewType === "activity") {
    panelHeading.textContent = "ACTIVITY";
    renderActivityPanel();
  }
}

function renderFavoritesPanel() {
  const user = SuboUser.getUser();
  panelBody.innerHTML = "";

  if (user.favorites.length === 0) {
    panelBody.innerHTML = `<div class="slot-item">No favorite dishes saved yet.</div>`;
    return;
  }

  user.favorites.forEach(function (dish) {
    const card = document.createElement("div");
    card.className = "recipe-card-mini";
    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}" class="recipe-thumb">
      <div class="recipe-info">
        <h3 class="recipe-title">${dish.name}</h3>
        <div class="recipe-meta-row">
          <span class="tag-cat">${dish.category}</span>
          <span class="tag-diff">${dish.difficulty}</span>
        </div>
      </div>
      <button type="button" class="remove-fav-btn" title="Remove">×</button>
    `;

    card.querySelector(".remove-fav-btn").addEventListener("click", function () {
      SuboUser.removeFavorite(dish.name);
      renderFavoritesPanel();
    });

    panelBody.appendChild(card);
  });
}

function renderSettingsPanel() {
  const user = SuboUser.getUser();
  const settingsLabels = {
    notifications: "Recipe Notifications",
    darkMode: "High Contrast Mode",
    metricUnits: "Metric Measurements",
    autoSaveHistory: "Save Search History"
  };

  panelBody.innerHTML = "";

  Object.keys(settingsLabels).forEach(function (key) {
    const isOn = user.settings[key];
    const row = document.createElement("div");
    row.className = "slot-item";
    row.innerHTML = `
      <span>${settingsLabels[key]}</span>
      <button type="button" class="toggle-btn ${isOn ? "on" : ""}" data-key="${key}">
        ${isOn ? "ON" : "OFF"}
      </button>
    `;
    panelBody.appendChild(row);
  });

  panelBody.querySelectorAll(".toggle-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      SuboUser.toggleSetting(btn.dataset.key);
      renderSettingsPanel();
    });
  });
}

function renderEditPanel() {
  const user = SuboUser.getUser();
  panelBody.innerHTML = `
    <form id="edit-form" class="slot-list" style="display:flex; flex-direction:column; gap:10px;">
      <label style="font-size:12px; color:#fff; font-family:'Modak';">Username:</label>
      <input type="text" id="edit-username" class="slot-input" value="${user.username}" required>
      
      <label style="font-size:12px; color:#fff; font-family:'Modak';">Email:</label>
      <input type="email" id="edit-email" class="slot-input" value="${user.email}" required>
      
      <button type="submit" class="slot-save-btn" style="margin-top:6px;">SAVE CHANGES</button>
    </form>
  `;

  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newName = document.getElementById("edit-username").value.trim();
    const newEmail = document.getElementById("edit-email").value.trim();
    if (newName) {
      SuboUser.updateAccount({ username: newName, email: newEmail });
      renderProfileHeader();
      showMenu();
    }
  });
}

function renderActivityPanel() {
  const user = SuboUser.getUser();
  panelBody.innerHTML = "";

  user.activity.forEach(function (entry) {
    const item = document.createElement("div");
    item.className = "slot-item";
    item.style.fontSize = "12px";
    item.textContent = entry;
    panelBody.appendChild(item);
  });
}

actionRowButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const target = btn.dataset.target;
    if (target === "view-settings") showSubPanel("settings");
    if (target === "view-favorites") showSubPanel("favorites");
    if (target === "view-edit") showSubPanel("edit");
    if (target === "view-activity") showSubPanel("activity");
  });
});

btnBack.addEventListener("click", function () {
  if (currentActiveView !== "menu") {
    showMenu();
  } else {
    document.querySelector("[data-page-link=\"search\"]").click();
  }
});

btnLogout.addEventListener("click", function () {
  SuboUser.logActivity("Logged out"); document.querySelector("[data-page-link=\"search\"]").click();
});

renderProfileHeader();
showMenu();

  })();
  }
})();
