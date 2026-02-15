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

const POKEMON_MODAL = document.getElementById('pokemonModal');
const MODAL_CARD = document.getElementById('card');
const MODAL_ID = document.getElementById('pokemonID');
const MODAL_NAME = document.getElementById('pokemonName');
const MODAL_SPRITE = document.getElementById('pokemonSprite');
const MODAL_TYPES = document.getElementById('pokemonTypes');
const MODAL_SKILLS = document.getElementById('pokemonSkills');

function renderModal(object) {
    //Vis modalet
    POKEMON_MODAL.style.display = "flex";
    
    //Angiver første pokemontype som dataset på "card", som bruges til at style baggrundsfarven efter type
    MODAL_CARD.dataset.type = object.types[0];

    //Udfyld modal data
    MODAL_ID.textContent = `#${object.id} | `;
    MODAL_NAME.textContent = object.name;
    MODAL_SPRITE.src = object.image;
    MODAL_SPRITE.setAttribute('alt', `Billede af ${object.name}`);

    MODAL_TYPES.replaceChildren(); //Tømmer UL
    object.types.forEach(type => {
        const li = document.createElement('li');
        li.textContent = type;
        MODAL_TYPES.appendChild(li);
    });
    MODAL_SKILLS.replaceChildren();

    object.skills.forEach(skill => {
        const li = document.createElement('li');
        li.classList.add('skill');

        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = skill.name;

        const desc = document.createElement('p');
        desc.classList.add('desc');
        desc.textContent = skill.effect;

        li.appendChild(title);
        li.appendChild(desc);

        MODAL_SKILLS.appendChild(li);
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
        console.info(`Viser Pokemon fra Generation ${gen}:`);
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

        console.log(pokemonData);
        renderModal(pokemonData);
    } catch (error) {
        console.error('Error fetching requested Pokémon:', error)
    }
}

fetchGeneration(1);