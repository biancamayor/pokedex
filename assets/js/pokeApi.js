
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map(function(typeSlot){
        return typeSlot.type.name
    })
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = function(pokemon){
    return fetch(pokemon.url)
        .then(function(response){
            return response.json()
        })
        .then(convertPokeApiDetailToPokemon)
}
/* FETCH: maneira de pedir requisição de algo pra essa url, o fetch faz uma promessa de devolver uma resposta, ao dar
a resposta, ele chama o método then. Caso then dê errado, chama catch. De qualquer forma chama o finally.*/

/* then: após pedir a requisição, realize isso. Após ..., faça ... 
o primeiro then usa a resposta do fetch, o segundo usa do primeiro e assim por diante.*/

/*offset = posição inicial  e limit = posição limite, até onde vai. carregar de tanto em tanto(ex: carregar novos pokemons na pagina de 5 em 5) */


pokeApi.getPokemons = function (offset, limit) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    return fetch(url)
        .then(function(response){
            return response.json()  /* converte para json a resposta. */
        })
        .then(function(jsonBody){
            return jsonBody.results /* para exibir apenas os resultados do jsonBody, ou seja, a lista de pokemons existentes */
        })
        .then(function(pokemons){
            return pokemons.map(pokeApi.getPokemonDetail)
        })
        .then(function(detailRequests) {
            return Promise.all(detailRequests) 
        })
        .then(function (pokemonDetails) {
            return pokemonDetails
        })

         /* Se não for bem concluida a requisição, faz isso. Caso dê erro. */
        .catch(function(error){
            console.log(error)
        })
          
}
