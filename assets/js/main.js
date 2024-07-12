const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('buttonLoadMore')

const maxRecords = 151
const limit = 30;
let offset = 0;

/* converte os pokemons recebidos da requisição em html. */
function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#0${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map(function(type){
                        return `<li class = "type ${type}">${type}</li>`}).join('')
                    }
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}"/>
            </div>
        </li> 
        `
    };

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(function(pokemons = []){
        const listaDeTodosOsPokemonsEmHtml = []
        for (let i = 0; i < pokemons.length; i++) {     /* São vários pokemons, a função converte 1 de cada vez para html. Usa-se então o for. */
            const pokemon = pokemons[i];
            listaDeTodosOsPokemonsEmHtml.push(convertPokemonToHtml(pokemon))   /* adiciona cada pokemon convertido em html a uma lista, 1 por 1. */
       }
       pokemonList.innerHTML += listaDeTodosOsPokemonsEmHtml.join('') /* para juntar todos os pokemons da lista sem inserir espaços e vírgulas. */
    })
}
    
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', function() {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

   
