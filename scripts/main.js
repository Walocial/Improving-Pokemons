const GENERATION_DROPDOWN = document.getElementById('generations');

GENERATION_DROPDOWN.addEventListener('change', ({target}) => {
    target.value === 'all' ? renderPokemons(allPokemons) : fetchGeneration(target.value);
});

const LIST_BTN = document.getElementById('listBtn');
const GRID_BTN = document.getElementById('gridBtn');

LIST_BTN.addEventListener('click', () => {
    POKEMON_LIST.classList.remove('gridView');
    POKEMON_LIST.classList.add('listView');
    GRID_BTN.classList.remove('btn-selected');
    LIST_BTN.classList.add('btn-selected');
});
GRID_BTN.addEventListener('click', () => {
    POKEMON_LIST.classList.remove('listView');
    POKEMON_LIST.classList.add('gridView');
    LIST_BTN.classList.remove('btn-selected');
    GRID_BTN.classList.add('btn-selected');
});

const CLOSE_MODAL = document.getElementById('closeModal');

CLOSE_MODAL.addEventListener('click', () => {
    POKEMON_MODAL.style.display = "none";
});

window.addEventListener('keydown', (event) => {
    if (POKEMON_MODAL.style.display == "flex" && event.key === 'Escape') {
        POKEMON_MODAL.style.display = "none";
    }
})