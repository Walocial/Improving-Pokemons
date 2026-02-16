//main.js indeholder logik for løst og fast, som ikke kræver sin egen fil

//Generations dropdown
const GENERATION_DROPDOWN = document.getElementById('generations');
GENERATION_DROPDOWN.addEventListener('change', ({target}) => fetchGeneration(target.value));


//View-knapperne der styrer om det er liste eller grid view
const LIST_BTN = document.getElementById('listBtn');
const GRID_BTN = document.getElementById('gridBtn');

function setView(view) {
    const isGrid = view === 'grid';

    POKEMON_LIST.classList.toggle('gridView', isGrid);
    POKEMON_LIST.classList.toggle('listView', !isGrid);

    GRID_BTN.classList.toggle('btn-selected', isGrid);
    LIST_BTN.classList.toggle('btn-selected', !isGrid);

    localStorage.setItem('view', view);
}
LIST_BTN.addEventListener('click', () => setView('list'));
GRID_BTN.addEventListener('click', () => setView('grid'));


//Knapper til Light og Dark mode
const LIGHT_BTN = document.getElementById('lightBtn');
const DARK_BTN = document.getElementById('darkBtn');

function changeTheme(theme) {
    document.documentElement.classList.remove('light_theme');
    
    if (theme === 'light_theme') {
        document.documentElement.classList.add('light_theme');
    }

    const isLight = theme === 'light_theme';

    LIGHT_BTN.style.display = isLight ? 'none' : 'inline';
    DARK_BTN.style.display = isLight ? 'inline' : 'none';

    localStorage.setItem('theme', theme);
}
LIGHT_BTN.addEventListener('click', () => changeTheme('light_theme'));
DARK_BTN.addEventListener('click', () => changeTheme('default'));


//Eventlistener der skifter tema, view og valgte generation ud fra localStorage data
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedView = localStorage.getItem('view') || 'list';
    const savedGen = localStorage.getItem('shownGen') || '1';
    changeTheme(savedTheme);
    setView(savedView);
    fetchGeneration(savedGen); //Funktion nedarvet fra getPokemon.js
    GENERATION_DROPDOWN.value = savedGen; //Opdaterer dropdown til at matche valgte Generation
});