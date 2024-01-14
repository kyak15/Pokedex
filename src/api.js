export async function getPokemon(count){
    
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${count}&limit=20`);
    const data = await res.json();
    const newData = data.results;
    const newAns = await Promise.all(newData.map(async(item) =>{
        const resp = await fetch(item.url)
        const infoData = await resp.json()
        return {
            name: item.name,
            image: infoData.sprites.front_default,
            type:  infoData.types.map(item => `${item.type.name}`)
            //abilities: infoData.abilities.map(item => `${item.ability.name} `),
            //weight: infoData.weight,
            //height: infoData.height,                
        }
    }))
    return newAns;
}


export async function getPokemonDetail(poke){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    const detailData = await res.json()
    return detailData
}

export const typeClassMap = {
    'grass': 'grass',
    'fire': 'fire',
    'electric': 'electric',
    'dragon': 'dragon',
    'dark': 'dark',
    'fighting': 'fighting',
    'psychic': 'psychic',
    'fairy': 'fairy',
    'flying': 'flying',
    'ghost': 'ghost',
    'ground': 'ground',
    'bug': 'bug',
    'ice': 'ice',
    'poison': 'poison',
    'rock': 'rock',
    'steel': 'steel',
    'water': 'water',
    'normal': 'normal',
  };