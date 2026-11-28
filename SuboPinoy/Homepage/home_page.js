// 1. All 12 Recipes (4 per page = 3 pages)
const recipes = [
  // Page 1 (your Pinterest images)
  {
    id: 'chicken-adobo',
    name: 'Chicken Adobo',
    difficulty: 'Easy',
    time: '45 mins',
    category: 'chicken',
    image: 'https://i.pinimg.com/736x/a5/95/dc/a595dcfe363437bc112efc69ec0c20a6.jpg'
  },
  {
    id: 'pork-sinigang',
    name: 'Pork Sinigang',
    difficulty: 'Medium',
    time: '1 hr',
    category: 'soup',
    image: 'https://i.pinimg.com/736x/c3/2f/08/c32f0879160b9fdf0ab68262f9df56f3.jpg'
  },
  {
    id: 'beef-caldereta',
    name: 'Beef Caldereta',
    difficulty: 'Medium',
    time: '2 hrs',
    category: 'beef',
    image: 'https://i.pinimg.com/736x/52/b6/90/52b6902e073598e2816e91f87b75afe0.jpg'
  },
  {
    id: 'lumpia',
    name: 'Lumpia',
    difficulty: 'Easy',
    time: '30 mins',
    category: 'appetizer',
    image: 'https://i.pinimg.com/736x/c4/25/37/c42537aa3cd6e6650eae15216ac0f8b1.jpg'
  },

  // Page 2
  {
    id: 'pork-menudo',
    name: 'Pork Menudo',
    difficulty: 'Medium',
    time: '50 mins',
    category: 'pork',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400'
  },
  {
    id: 'pork-kare-kare',
    name: 'Pork Kare-Kare',
    difficulty: 'Hard',
    time: '1 hr',
    category: 'pork',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: 'beef-mechado',
    name: 'Beef Mechado',
    difficulty: 'Medium',
    time: '1 hr 45 mins',
    category: 'beef',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400'
  },
  {
    id: 'tokwat-baboy',
    name: 'Tokwa’t Baboy',
    difficulty: 'Easy',
    time: '35 mins',
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'
  },

  // Page 3
  {
    id: 'lechon-kawali',
    name: 'Lechon Kawali',
    difficulty: 'Medium',
    time: '1 hr 15 mins',
    category: 'pork',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400'
  },
  {
    id: 'pancit-canton',
    name: 'Pancit Canton',
    difficulty: 'Easy',
    time: '30 mins',
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'
  },
  {
    id: 'chicken-tinola',
    name: 'Chicken Tinola',
    difficulty: 'Easy',
    time: '45 mins',
    category: 'soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: 'halo-halo',
    name: 'Halo-Halo',
    difficulty: 'Easy',
    time: '20 mins',
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400'
  }
];

// 2. Memory Variables
const ITEMS_PER_PAGE = 4;
let currentPage = 1;
let activeCategory = null;
let searchQuery = '';

// 3. Grab HTML Elements
const grid = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const paginationBar = document.getElementById('paginationBar');
const paginationDots = document.getElementById('paginationDots');
const prevBtn = document.getElementById('prevPageBtn');
const nextBtn = document.getElementById('nextPageBtn');

// 4. Filter by Search + Category
function getFilteredRecipes() {
  return recipes.filter((r) => {
    const matchName = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !activeCategory || r.category === activeCategory;
    return matchName && matchCategory;
  });
}

// 5. Render Current Page of Cards + Pagination Dots
function showRecipes() {
  const filtered = getFilteredRecipes();
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  if (currentPage > totalPages) currentPage = totalPages;
  grid.innerHTML = '';

  // Empty State ("No recipes found")
  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No recipes found. Try another search!</p>`;
    if (paginationBar) paginationBar.style.display = 'none';
    return;
  }

  if (paginationBar) paginationBar.style.display = 'flex';

  // Slice 4 cards for the current page
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  pageItems.forEach((recipe) => {
    grid.innerHTML += `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" />
        <h3>${recipe.name}</h3>
        <div class="card-bottom">
          <div class="card-info">
            <p><i class="fa-solid fa-fire-burner"></i> ${recipe.difficulty}</p>
            <p><i class="fa-regular fa-clock"></i> ${recipe.time}</p>
          </div>
          <a href="../Infopage/info_page.html?id=${recipe.id}" class="arrow-btn">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  });

  renderPagination(totalPages);
}

// 6. Build Dots & Hide/Show Arrows
function renderPagination(totalPages) {
  if (!paginationDots) return;

  prevBtn.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
  nextBtn.style.visibility = currentPage === totalPages ? 'hidden' : 'visible';

  paginationDots.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const dot = document.createElement('button');
    dot.className = i === currentPage ? 'page-dot active' : 'page-dot';
    dot.addEventListener('click', () => {
      currentPage = i;
      showRecipes();
    });
    paginationDots.appendChild(dot);
  }
}

// 7. Search Input Listener
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim();
  currentPage = 1;
  showRecipes();
});

// 8. Category Button Toggle Listeners
categoryBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const clicked = btn.dataset.category;
    if (activeCategory === clicked) {
      activeCategory = null;
      btn.classList.remove('active');
    } else {
      activeCategory = clicked;
      categoryBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    }
    currentPage = 1;
    showRecipes();
  });
});

// 9. Arrow Click Listeners
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showRecipes();
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(getFilteredRecipes().length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      showRecipes();
    }
  });
}

// 10. Mobile Swipe Support
let touchStartX = 0;
grid.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

grid.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  const totalPages = Math.ceil(getFilteredRecipes().length / ITEMS_PER_PAGE);
  if (diff < -45 && currentPage < totalPages) {
    currentPage++;
    showRecipes();
  } else if (diff > 45 && currentPage > 1) {
    currentPage--;
    showRecipes();
  }
}, { passive: true });

// Initial Render
showRecipes();