const moodSelect = document.getElementById('mood');
const getRecipeBtn = document.getElementById('getRecipeBtn');
const newRecipeBtn = document.getElementById('newRecipeBtn');
const recipeSection = document.getElementById('recipeSection');
const statusMessage = document.getElementById('statusMessage');
const recipeContent = document.getElementById('recipeContent');
const recipeTitle = document.getElementById('recipeTitle');
const recipeMood = document.getElementById('recipeMood');
const recipeDescription = document.getElementById('recipeDescription');
const recipeIngredients = document.getElementById('recipeIngredients');
const recipeInstructions = document.getElementById('recipeInstructions');

let currentRecipeId = null;

function setLoading(isLoading) {
  getRecipeBtn.disabled = isLoading;
  newRecipeBtn.disabled = isLoading || !currentRecipeId;
  if (isLoading) {
    getRecipeBtn.textContent = 'Finding recipe...';
  } else {
    getRecipeBtn.textContent = 'Get recipe';
  }
}

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.remove('hidden');
  statusMessage.classList.toggle('text-red-400', isError);
  statusMessage.classList.toggle('text-slate-400', !isError);
}

function clearStatus() {
  statusMessage.textContent = '';
  statusMessage.classList.add('hidden');
}

function renderRecipe(recipe) {
  if (!recipe) return;

  currentRecipeId = recipe.id;
  recipeTitle.textContent = recipe.title;
  recipeMood.textContent = recipe.mood;
  recipeDescription.textContent = recipe.description || '';

  recipeIngredients.innerHTML = '';
  if (recipe.ingredients) {
    recipe.ingredients.split(',').forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.trim();
      recipeIngredients.appendChild(li);
    });
  }

  recipeInstructions.textContent = recipe.instructions || '';

  recipeSection.classList.remove('hidden');
  recipeContent.classList.remove('hidden');
  clearStatus();
  newRecipeBtn.disabled = false;
}

async function fetchRecipe(options = {}) {
  const mood = moodSelect.value;
  if (!mood) {
    showStatus('Please choose a mood first.', true);
    return;
  }

  setLoading(true);
  recipeSection.classList.remove('hidden');
  showStatus('Looking for something tasty...');

  const params = new URLSearchParams({ mood });
  if (options.excludeCurrent && currentRecipeId) {
    params.set('excludeId', currentRecipeId);
  }

  try {
    const res = await fetch(`/api/recipes?${params.toString()}`);
    const data = await res.json();

    if (!res.ok) {
      showStatus(data.error || 'Could not fetch a recipe.', true);
      recipeContent.classList.add('hidden');
      currentRecipeId = null;
      newRecipeBtn.disabled = true;
      return;
    }

    renderRecipe(data);
  } catch (err) {
    console.error(err);
    showStatus('Network error while fetching recipe.', true);
  } finally {
    setLoading(false);
  }
}

getRecipeBtn.addEventListener('click', () => {
  currentRecipeId = null;
  fetchRecipe();
});

newRecipeBtn.addEventListener('click', () => {
  fetchRecipe({ excludeCurrent: true });
});

