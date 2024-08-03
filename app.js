const searchBox = document.querySelector('.search-input');
const searchBtn = document.querySelector('.btn');
const recipeContainer = document.querySelector('.recipe-container');
const modal = document.querySelector('.recipe-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const recipeDescription = document.querySelector('.recipe-description');

// fetch recipes async function
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = `<h2>Loading recipes..</h2>`
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response);
    

    recipeContainer.innerHTML = '';
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = 
        `
            <img src='${meal.strMealThumb}'>
            <h3>${meal.strMeal}</h3>
            <p> Type of dish: <span>${meal.strArea} ${meal.strCategory}</span></p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.classList.add('view');

        button.addEventListener('click', () => {
            openRecipeModal(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
   }
catch (error) {
    recipeContainer.innerHTML = `<h2>Error finding recipes..</h2>`
}
}


// fetch ingredients function
const fetchIngredients = (meal) => {
    let ingredientsList = '';
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
        else {
            break;
        }
    }
    return ingredientsList;
}


const openRecipeModal = (meal) => {
    recipeDescription.innerHTML = `
        <h2 class='meal-name'>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class='ingredient-list'>${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p class='instructions'>${meal.strInstructions}</p>
        </div>
    `

    

    recipeDescription.parentElement.style.display = 'block';
}


closeModalBtn.addEventListener('click', () => {
    closeModal();
});

// close modal function
function closeModal() {
    closeModalBtn.parentElement.style.display = 'none';
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();

    if(!searchBox.value) {
        recipeContainer.innerHTML = `<h2>Nothing to show.. Search bar is empty.. Try typing in ingredients or meal..</h2>`;
        return;
    };

    fetchRecipes(searchInput);
});