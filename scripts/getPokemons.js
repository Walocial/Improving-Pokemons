const POKEMON_LIST = document.getElementById('pokemonList');

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
            fetchSpecificPokemon(pokemon.url);
        });
        POKEMON_LIST.appendChild(li);
    });
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
                    id: Number(defaultVariety.pokemon.url.split('/')[6]), //Udplukker pokemon ID fra URL
                    name: defaultVariety.pokemon.name,
                    url: defaultVariety.pokemon.url
                };
            })
        );

        genPokemons.sort((a, b) => a.id - b.id); //Sorterer efter ID, da pokemons ellers forekommer i en underlig rækkefølge

        renderPokemons(genPokemons);
        localStorage.setItem('shownGen', gen);
    } catch (error) {
        console.error(`Error fetching Generation ${gen}:`, error);
    }
}

async function fetchSpecificPokemon(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const abilities = data.abilities.slice(0, 2); //Bruger højest 2 abilities

        const abilityDetails = await Promise.all(
            abilities.map(async (ab) => {
                const res = await fetch(ab.ability.url);
                const abilityData = await res.json();

                const eng = abilityData.effect_entries.find(
                    entry => entry.language.name === "en"
                );

                return {
                    name: ab.ability.name,
                    effect: eng.short_effect
                };
            })
        );

            let pokemonData = {
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map(t => t.type.name),
                skills: abilityDetails
            }

        renderModal(pokemonData);
    } catch (error) {
        console.error('Error fetching requested Pokémon:', error)
    }
}