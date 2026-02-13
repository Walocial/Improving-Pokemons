const GENERATION_DROPDOWN = document.getElementById('generations');

GENERATION_DROPDOWN.addEventListener('change', ({target}) => {
    target.value === 'all' ? renderPokemons(allPokemons) : fetchGeneration(target.value);
})