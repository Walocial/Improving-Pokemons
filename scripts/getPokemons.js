const POKEMON_LIST = document.getElementById('pokemonList');


async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = await response.json();

        console.log(data)
    } catch (error) {
        console.error('Error fetching Pokemons', error);
    }
}
async function fetchGeneration(gen) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(`Error fetching Generation ${gen}:`, error);
    }
}

fetchPokemons();
fetchGeneration(1);