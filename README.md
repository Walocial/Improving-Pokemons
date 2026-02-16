# Improving Pokemons

Live demo:  
https://tjuulm.dk/improving/

Projektet kan køres lokalt ved blot at åbne `index.html` i en browser.  
Der er ingen afhængigheder eller build tools.

## Beskrivelse

Dette er en lille frontend applikation bygget i vanilla JavaScript, som henter data fra PokéAPI.

Applikationen:

- Henter en liste af Pokemon i en generation gennem et endpoint
- Viser dem i liste- eller grid-view
- Gør hvert element klikbart
- Henter detaljer fra et separat endpoint
- Viser detaljerne i en modal

Listen og detaljerne hentes via separate API-kald.

Derudover har jeg tilføjet:

- Sortering efter Pokedex ID
- Skift mellem grid- og liste-view
- Lys og mørk tema
- Persistens af valgt tema, view og generation via localStorage
- Responsivitet med en mobile-first tilgang

## Teknologivalg

Projektet er lavet i:

- Vanilla JavaScript
- HTML
- CSS

Jeg valgte at bruge vanilla JavaScript for at demonstrere forståelse for:

- DOM manipulation
- Asynkron datahentning med fetch og async/await
- Strukturering af funktioner til datahentning og rendering

## Udfordringer

Den største udfordring var strukturen i PokeAPI.

Data hænger sammen på tværs af flere endpoints. For eksempel:

- Generationer returnerer pokemon-species (I modsætning til hvad endpointet for alle pokemons gør)
- Species peger videre på det faktiske pokemon endpoint
- Abilities kræver endnu et separat endpoint for at hente beskrivelser

For at løse dette:

- Mapper jeg species til deres default pokemon
- Henter ability-detaljer parallelt via Promise.all
- Begrænser abilities til maks to og filtrerer på engelsk beskrivelse

## Hvad jeg ville forbedre med mere tid

- Implementere loading states ved API-kald
- Optimere performance ved hentning af større datamængder
- Cache data for at reducere gentagne fetch-kald
- Tilføje sprites i listen for bedre visuelt overblik
- Tilføje søgefunktion, så der kan søges på navn og ID
