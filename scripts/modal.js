const POKEMON_MODAL = document.getElementById('pokemonModal');
const CLOSE_MODAL_BTN = document.getElementById('closeModalBtn');
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


function closeModal() {
    POKEMON_MODAL.style.display = "none";
    MODAL_SPRITE.src = ""; //Unset billede så en tidligere klikket pokemon ikke bliver vist i et split-sekundt
}
window.addEventListener('keydown', (e) => { if (POKEMON_MODAL.style.display == "flex" && e.key === 'Escape') closeModal();});
POKEMON_MODAL.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal();});
CLOSE_MODAL_BTN.addEventListener('click', () => closeModal());
