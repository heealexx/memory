export async function getData(){
  const pokemon = [];
  for (let i = 1; i <= 151; i++){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${i}`);
    const data = await response.json();
    pokemon.push({
      name : data.name,
      img : data.sprites.front_default,
      id : i
    });
  }
  return pokemon;
}
