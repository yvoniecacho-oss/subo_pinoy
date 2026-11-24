const recipes = [
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
  }
];
const grid = document.getElementById('recipeGrid');
const searchInput = document.getElementById('searchInput');

function showRecipes(list) {
  grid.innerHTML = '';

  list.forEach((recipe) => {
    grid.innerHTML += `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" />
        <h3>${recipe.name}</h3>

        <div class="card-bottom">
          <div class="card-info">
            <p><i class="fa-solid fa-fire-burner"></i> ${recipe.difficulty}</p>
            <p><i class="fa-regular fa-clock"></i> ${recipe.time}</p>
          </div>

          <a href="recipe.html?id=${recipe.id}" class="arrow-btn">
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  });
}

searchInput.addEventListener('input', () => {
  const text = searchInput.value.toLowerCase();
  const filtered = recipes.filter((r) => r.name.toLowerCase().includes(text));
  showRecipes(filtered);
});

showRecipes(recipes);
