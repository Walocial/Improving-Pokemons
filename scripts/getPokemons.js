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
            fetchSpecificPokemon(pokemon.url);
        });
        POKEMON_LIST.appendChild(li);
    });
}

const POKEMON_MODAL = document.getElementById('pokemonModal');
const MODAL_ID = document.getElementById('pokemonID');
const MODAL_NAME = document.getElementById('pokemonName');
const MODAL_SPRITE = document.getElementById('pokemonSprite');
const MODAL_TYPES = document.getElementById('pokemonTypes');

function renderModal(object) {
    POKEMON_MODAL.style.display = "flex";
    MODAL_ID.textContent = '#' + object.id;
    MODAL_NAME.textContent = object.name;
    MODAL_SPRITE.src = object.image;
    MODAL_SPRITE.setAttribute('alt', `Billede af ${object.name}`);

    MODAL_TYPES.replaceChildren();
    object.types.forEach(type => {
        const li = document.createElement('li');
        li.textContent = type;
        MODAL_TYPES.appendChild(li);
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

        const genPokemons = await Promise.all(
            data.pokemon_species.map(async (species) => {
                const res = await fetch(species.url);
                const speciesData = await res.json();

                const defaultVariety = speciesData.varieties.find(v => v.is_default);

                return {
                    name: defaultVariety.pokemon.name,
                    url: defaultVariety.pokemon.url
                };
            })
        );

        renderPokemons(genPokemons);
        console.info(`Viser Pokemon fra Generation ${gen}:`);
    } catch (error) {
        console.error(`Error fetching Generation ${gen}:`, error);
    }
}

async function fetchSpecificPokemon(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

            let pokemonData = {
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map(t => t.type.name)
            }

        console.log(pokemonData);
        renderModal(pokemonData);
    } catch (error) {
        console.error('Error fetching requested Pokémon:', error)
    }
}

fetchPokemons();