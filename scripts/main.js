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

const CLOSE_MODAL_BTN = document.getElementById('closeModalBtn');

function closeModal() {
    POKEMON_MODAL.style.display = "none";
    MODAL_SPRITE.src = ""; //Unset billede så en tidligere klikket pokemon ikke bliver vist i et split-sekundt
}

CLOSE_MODAL_BTN.addEventListener('click', () => {
    closeModal();
});

//Eventlistner til at lukke modalet når der klikkes uden for det viste "card"
//Grundet HTML strukturen er det nødvendigt med sådan et if-statement pga. propagation
POKEMON_MODAL.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
})

window.addEventListener('keydown', (e) => {
    if (POKEMON_MODAL.style.display == "flex" && event.key === 'Escape') {
        closeModal();
    }
})