const POKEMON_LIST = document.getElementById('pokemonList');
let allPokemons = []; // Array til at gemme Pokemons uden for API kaldets scope

// Funktion til at render pokemons i DOM
// Tager et array, og render en liste ud fra items
function renderPokemons(array) {
    let pokemonList = array;
    POKEMON_LIST.replaceChildren();
    pokemonList.forEach(pokemon => {
        const li = document.createElement('li');
        li.classList.add('pokemon');
        li.textContent = pokemon.name;
        li.addEventListener('click', () => {
            console.log(pokemon.url);
        });
        POKEMON_LIST.appendChild(li);
    });
}

async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = await response.json();

        allPokemons = data.results;

        renderPokemons(allPokemons);
        console.info('Viser alle Pokemons');
    } catch (error) {
        console.error('Error fetching Pokemons', error);
    }
}
async function fetchGeneration(gen) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
        const data = await response.json();

        let genPokemons = data.pokemon_species.map(species => ({
            name: species.name,
            url: species.url
        }));

        renderPokemons(genPokemons);
        console.info(`Viser Pokemon fra Generation ${gen}:`);
    } catch (error) {
        console.error(`Error fetching Generation ${gen}:`, error);
    }
}

fetchPokemons();