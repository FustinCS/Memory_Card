import { CardItem } from "../interfaces";

async function getPokemonInfo(pokemonId: number): Promise<CardItem> {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/",
    { mode: "cors" }
  );
  const pokemonData = await response.json();
  const item: CardItem = {
    name: pokemonData.forms[0].name,
    image: pokemonData.sprites.other["official-artwork"].front_default,
  };
  return item;
}

async function createPokemonCardList(): Promise<CardItem[]> {
  const min = 1;
  const max = 151;

  const pokemonList: CardItem[] = [];

  for (let i = min; i <= max; i++) {
    const currentPokemonInfo = await getPokemonInfo(i);
    pokemonList.push(currentPokemonInfo);
  }

  return pokemonList;
}

function fillWithRandomPokemon(allPokemon: CardItem[], size: number) {
  const min = 1;
  const max = 151;

  const result = [];
  const usedNumbers: number[] = [];
  for (let i = 0; i < size; i++) {
    let currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // reroll if we already that pokemon in our list
    while (usedNumbers.includes(currentNumber)) {
      currentNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } 

    usedNumbers.push(currentNumber);
    result.push(allPokemon[currentNumber]);
  }

  return result;
}

export { createPokemonCardList, fillWithRandomPokemon };
